import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Span } from 'nestjs-otel';
import {
	UserDAO,
	UserEntity,
	UserRepository,
	UserService as BaseService,
} from '@azkaban/azkaban-infrastructure';
import { UsersCache } from './users.cache';
import { Repository } from 'typeorm';
import {
	UserByIdDTO,
	UserByUserIdDTO,
	UserCreateDTO,
	UsersListDTO,
	UserUpdateDTO,
} from '../../utils';
import { Nullable } from '@azkaban/shared';

@Injectable()
export class UsersService {
	private readonly infrastructureRepository: UserRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		private readonly cache: UsersCache,
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

	@Span('userList')
	async userList(data: UsersListDTO): Promise<Array<UserDAO>> {
		Logger.log('UserList', data);
		const users = await this.infrastructureService.getUserList(
			data.limit,
			data.offset,
		);
		Logger.log('users', users);
		await this.cache.cacheUserList(users, data.limit, data.offset);
		return users;
	}

	@Span('userById')
	async userById(data: UserByIdDTO): Promise<Nullable<UserDAO>> {
		Logger.log('UserById', data);
		const user = await this.infrastructureService.getUserById(data.id);
		Logger.log('user', user);
		if (user !== null) {
			await this.cache.cacheUserById(data.id, user);
			return user;
		}
		return null;
	}

	@Span('userByUserId')
	async userByUserId(data: UserByUserIdDTO): Promise<Nullable<UserDAO>> {
		Logger.log('UserByUserId', data);
		const user = await this.infrastructureService.getUserByUserId(
			data.user_id,
		);
		Logger.log('user', user);
		if (user !== null) {
			await this.cache.cacheUserByUserId(data.user_id, user);
			return user;
		}
		return null;
	}

	@Span('userCreate')
	async userCreate(data: UserCreateDTO): Promise<UserDAO> {
		Logger.log('UserCreate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.createUser(data);
	}

	@Span('userUpdate')
	async userUpdate(data: UserUpdateDTO): Promise<UserDAO> {
		Logger.log('UserUpdate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.updateUser(data.id, data.data);
	}

	@Span('userDelete')
	async userDelete(data: UserByIdDTO): Promise<UserDAO> {
		Logger.log('UserDelete', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deleteUser(data.id);
	}

	@Span('userRestore')
	async userRestore(data: UserByIdDTO): Promise<UserDAO> {
		Logger.log('UserRestore', data);
		await this.cache.removeCache();
		return await this.infrastructureService.restoreUser(data.id);
	}

	@Span('userActivate')
	async userActivate(data: UserByIdDTO): Promise<UserDAO> {
		Logger.log('UserActivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.activateUser(data.id);
	}

	@Span('userDeactivate')
	async userDeactivate(data: UserByIdDTO): Promise<UserDAO> {
		Logger.log('UserDeactivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deactivateUser(data.id);
	}
}
