import { AuthFactory } from '../factories';
import { UserRepository, GroupRepository } from '../repositories';
import { Result } from '@azkaban/shared';
import { AuthAnemic, GroupAnemic, UserAnemic } from '../anemics';
import { GroupService } from './group.service';
import { UserService } from './user.service';

export class AuthService {
	private readonly factory: AuthFactory = new AuthFactory();
	private readonly userService: UserService;
	private readonly groupService: GroupService;

	constructor(
		private readonly userRepository: UserRepository,
		private readonly groupRepository: GroupRepository,
	) {
		this.userService = new UserService(userRepository);
		this.groupService = new GroupService(groupRepository);
	}

	private async checkUserLogin(
		username: string,
		password: string,
	): Promise<Result<UserAnemic>> {
		const user = await this.userService.findByUsername(username);
		if (user.isFailure) {
			return Result.fail<UserAnemic>('404');
		}
		if (user.value.password !== password) {
			return Result.fail<UserAnemic>('401');
		}
		if (user.value.isBanned) {
			return Result.fail<UserAnemic>('403');
		}
		if (!user.value.isActivated) {
			return Result.fail<UserAnemic>('403');
		}
		return Result.ok<UserAnemic>(user.value);
	}

	private async checkUserGroups(
		userId: string,
	): Promise<Result<Array<GroupAnemic>>> {
		const groups = await this.groupService.findByUserId(userId);
		if (groups.isFailure) {
			return Result.fail<Array<GroupAnemic>>('404');
		}
		return Result.ok<Array<GroupAnemic>>(groups.value);
	}

	async login(
		username: string,
		password: string,
	): Promise<Result<AuthAnemic>> {
		try {
			const userResult = await this.checkUserLogin(username, password);

			if (userResult.isFailure) {
				return Result.fail<AuthAnemic>({
					user: null,
					groups: [],
				});
			}
			const groupsResult = await this.checkUserGroups(
				userResult.value.id,
			);
			if (groupsResult.isFailure) {
				return Result.fail<AuthAnemic>({
					user: null,
					groups: [],
				});
			}
			const auth = this.factory.reconstitute({
				user: userResult.value,
				groups: groupsResult.value,
			});
			auth.loginUser();
			await this.userService.save(auth.toAnemic().user);
			return Result.ok<AuthAnemic>(auth.toAnemic());
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<Result<AuthAnemic>> {
		try {
			const emailResult = await this.userService.findByEmail(email);
			if (emailResult.isSuccess) {
				return Result.fail<AuthAnemic>('400');
			}
			const usernameResult =
				await this.userService.findByUsername(username);
			if (usernameResult.isSuccess) {
				return Result.fail<AuthAnemic>('400');
			}
			const auth = this.factory.createDomain({
				user: {
					email,
					username,
					password,
				},
				groups: [],
			});
			const userResult = await this.userService.save(
				auth.toAnemic().user,
			);
			if (userResult.isSuccess) {
				// TODO: Save User Groups to Database
			}
			return Result.fail<AuthAnemic>('500');
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}
}
