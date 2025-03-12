import { Inject, Injectable, Logger } from '@nestjs/common';
import {
	UserEntity,
	UserRepository,
	UserService,
} from '@azkaban/user-infrastructure';
import { Repository } from 'typeorm';
import { AuthPresenter } from './auth.presenter';
import { AuthModel } from './auth.model';

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
			const presenter = new AuthPresenter(user, []);
			const checkPassword = presenter.checkPassword(password);
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
	): Promise<void> {
		//
	}

	async reset(email: string): Promise<void> {
		//
	}
}
