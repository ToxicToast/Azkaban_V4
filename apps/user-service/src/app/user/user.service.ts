import { Inject, Injectable } from '@nestjs/common';
import { UserPresenter } from './user.presenter';
import { UserModel } from './user.model';
import {
	UserDAO,
	UserEntity,
	UserRepository,
	UserService as BaseService,
} from '@azkaban/user-infrastructure';
import { Repository } from 'typeorm';
import {
	Nullable,
	Optional,
	PasswordHash,
	PasswordSalt,
} from '@azkaban/shared';

@Injectable()
export class UserService {
	private readonly infrastructureRepository: UserRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<UserEntity>,
	) {
		this.infrastructureRepository = new UserRepository(this.userRepository);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async userList(): Promise<Array<UserModel>> {
		const users = await this.infrastructureService.getUserList();
		return users.map((user: UserDAO) => {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		});
	}

	async userById(id: string): Promise<UserModel> {
		const user = await this.infrastructureService.getUserById(id);
		if (user !== null) {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async userCreate(
		username: string,
		email: string,
		password: string,
	): Promise<UserModel> {
		const salt = await PasswordSalt();
		const hashedPassword = await PasswordHash(password, salt);
		const user = await this.infrastructureService.createUser({
			username,
			email,
			password: hashedPassword,
			salt,
		});
		if (user !== null) {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async userUpdate(
		id: string,
		username?: Optional<string>,
		email?: Optional<string>,
		password?: Optional<string>,
	): Promise<UserModel> {
		const changeData = {};
		if (username !== undefined) {
			changeData['username'] = username;
		}
		if (email !== undefined) {
			changeData['email'] = email;
		}
		if (password !== undefined) {
			const salt = await PasswordSalt();
			const hashedPassword = await PasswordHash(password, salt);
			changeData['password'] = hashedPassword;
			changeData['salt'] = salt;
		}
		const user = await this.infrastructureService.updateUser(
			id,
			changeData,
		);
		if (user !== null) {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async userLogin(
		id: string,
		loggedInAt: Nullable<Date>,
	): Promise<UserModel> {
		const user = await this.infrastructureService.loginUser(id, loggedInAt);
		if (user !== null) {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		}
		return null;
	}
}
