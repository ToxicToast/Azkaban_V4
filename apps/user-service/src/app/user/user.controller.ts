import { Controller, HttpStatus } from '@nestjs/common';
import { AzkabanUserTopics, Nullable, UserRoutes } from '@azkaban/shared';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserResponse, UsersResponse } from './user.model';
import { UserCache } from './user.cache';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(
		private readonly service: UserService,
		private readonly cache: UserCache,
	) {}

	@MessagePattern(AzkabanUserTopics.LIST)
	async list(): Promise<UsersResponse> {
		const response = await this.service.userList();
		await this.cache.cacheUserList(response);
		return response;
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<UserResponse> {
		if (!id) {
			throw new RpcException({
				message: 'Id is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.userById(id);
		if (response === null) {
			throw new RpcException({
				message: 'User not found',
				status: HttpStatus.NOT_FOUND,
			});
		}
		await this.cache.cacheUserById(id, response);
		return response;
	}

	@MessagePattern(AzkabanUserTopics.CREATE)
	async create(
		@Payload('username') username: string,
		@Payload('email') email: string,
		@Payload('password') password: string,
	): Promise<UserResponse> {
		if (!username) {
			throw new RpcException({
				message: 'Username is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!email) {
			throw new RpcException({
				message: 'Email is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!password) {
			throw new RpcException({
				message: 'Password is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.userCreate(
			username,
			email,
			password,
		);
		if (response === null) {
			throw new RpcException({
				message: 'User not created',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		await this.cache.removeCacheOnCreate();
		return response;
	}

	@MessagePattern(AzkabanUserTopics.UPDATE)
	async update(
		@Payload('id') id: string,
		@Payload('username') username: string,
		@Payload('email') email: string,
		@Payload('password') password: string,
	): Promise<UserResponse> {
		if (!id) {
			throw new RpcException({
				message: 'User Id is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.userUpdate(
			id,
			username,
			email,
			password,
		);
		if (response === null) {
			throw new RpcException({
				message: 'User not updated',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		await this.cache.removeCacheOnCreate();
		return response;
	}

	@MessagePattern(AzkabanUserTopics.LOGIN)
	async login(
		@Payload('id') id: string,
		@Payload('loggedin_at') loggedin_at: Nullable<Date>,
	): Promise<UserResponse> {
		if (!id) {
			throw new RpcException({
				message: 'User Id is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.userLogin(id, loggedin_at);
		if (response === null) {
			throw new RpcException({
				message: 'User not updated',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		await this.cache.removeCacheOnCreate();
		return response;
	}
}
