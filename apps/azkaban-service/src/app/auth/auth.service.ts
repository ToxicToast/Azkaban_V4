import { Inject, Injectable, Logger } from '@nestjs/common';
import {
	UserDAO,
	CreateUserWithoutSaltDTO,
	UserEntity,
	UserRepository,
	UserService as BaseService,
} from '@azkaban/azkaban-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Span } from 'nestjs-otel';

@Injectable()
export class AuthService {
	private readonly infrastructureRepository: UserRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<UserEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.infrastructureRepository = new UserRepository(this.userRepository);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
			this.eventEmitter,
		);
	}

	@Span('authLogin')
	async authLogin(data: {
		username: string;
		password: string;
	}): Promise<UserDAO> {
		Logger.log('AuthLogin', data);
		return await this.infrastructureService.loginUser(data);
	}

	@Span('authRegister')
	async authRegister(data: CreateUserWithoutSaltDTO): Promise<UserDAO> {
		Logger.log('AuthRegister', { data });
		return await this.infrastructureService.createUser(data);
	}
}
