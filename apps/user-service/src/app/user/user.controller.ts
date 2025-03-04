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
			const response = await this.service.userList();
			return {
				data: response,
				error: null,
				errorCode: null,
			};
		} catch (error) {
			return {
				data: null,
				error,
				errorCode: 500,
			};
		}
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<UserResponse> {
		try {
			if (!id) {
				return {
					data: null,
					error: 'Id is required',
					errorCode: 400,
				};
			}
			const response = await this.service.userById(id);
			return {
				data: response,
				error: null,
				errorCode: null,
			};
		} catch (error) {
			return {
				data: null,
				error,
				errorCode: 500,
			};
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
				return {
					data: null,
					error: 'Username is required',
					errorCode: 400,
				};
			} else if (!email) {
				return {
					data: null,
					error: 'Email is required',
					errorCode: 400,
				};
			} else if (!password) {
				return {
					data: null,
					error: 'Password is required',
					errorCode: 400,
				};
			}
			const response = await this.service.userCreate(
				username,
				email,
				password,
			);
			return {
				data: response,
				error: null,
				errorCode: null,
			};
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
