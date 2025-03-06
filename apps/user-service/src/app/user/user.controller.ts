import { Controller } from '@nestjs/common';
import { AzkabanUserTopics, UserRoutes } from '@azkaban/shared';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserResponse, UsersResponse } from './user.model';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	@MessagePattern(AzkabanUserTopics.LIST)
	async list(): Promise<UsersResponse> {
		try {
			return await this.service.userList();
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<UserResponse> {
		try {
			if (!id) {
				throw new RpcException('Id is required');
			}
			const response = await this.service.userById(id);
			if (response === null) {
				throw new RpcException('User not found');
			}
			return response;
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(AzkabanUserTopics.CREATE)
	async create(
		@Payload('username') username: string,
		@Payload('email') email: string,
		@Payload('password') password: string,
	): Promise<UserResponse> {
		try {
			if (!username) {
				throw new RpcException('Username is required');
			} else if (!email) {
				throw new RpcException('Email is required');
			} else if (!password) {
				throw new RpcException('Password is required');
			}
			const response = await this.service.userCreate(
				username,
				email,
				password,
			);
			if (response === null) {
				throw new RpcException('User not created');
			}
			return response;
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
