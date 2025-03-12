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

	async userByEmail(email: string): Promise<UserModel> {
		const user = await this.infrastructureService.getUserByEmail(email);
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
		const user = await this.infrastructureService.createUser({
			username,
			email,
			password,
		});
		if (user !== null) {
			const presenter = new UserPresenter(user);
			return presenter.transform();
		}
		return null;
	}
}
