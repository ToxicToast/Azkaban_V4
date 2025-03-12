import { Inject, Injectable, Logger } from '@nestjs/common';
import {
	UserEntity,
	UserRepository,
	UserService,
} from '@azkaban/user-infrastructure';
import { Repository } from 'typeorm';
import { AuthPresenter } from './auth.presenter';
import { AuthModel } from './auth.model';
import { PasswordCompare, PasswordHash, PasswordSalt } from '@azkaban/shared';

@Injectable()
export class AuthService {
	private readonly userInfrastructureRepository: UserRepository;
	private readonly userInfrastructureService: UserService;

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<UserEntity>,
	) {
		this.userInfrastructureRepository = new UserRepository(
			this.userRepository,
		);
		this.userInfrastructureService = new UserService(
			this.userInfrastructureRepository,
		);
	}

	async login(email: string, password: string): Promise<AuthModel> {
		const user = await this.userInfrastructureService.getUserByEmail(email);
		if (user !== null) {
			if (user.activated_at === null) {
				return null;
			}
			if (user.banned_at !== null) {
				return null;
			}
			if (user.deleted_at !== null) {
				return null;
			}

			const presenter = new AuthPresenter(user, []);
			const checkPassword = await PasswordCompare(
				password,
				user.password,
			);
			if (checkPassword) {
				return presenter.transform();
			}
			return null;
		}
		return null;
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<AuthModel> {
		const salt = await PasswordSalt();
		const hashedPassword = await PasswordHash(password, salt);
		const user = await this.userInfrastructureService.createUser({
			username,
			email,
			password: hashedPassword,
			salt,
		});
		if (user !== null) {
			const presenter = new AuthPresenter(user, []);
			return presenter.transform();
		}
		return null;
	}

	async reset(email: string): Promise<void> {
		Logger.debug({ email }, 'Resetting password');
	}
}
