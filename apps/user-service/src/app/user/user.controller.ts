import { Controller, HttpStatus } from '@nestjs/common';
import { AzkabanUserTopics, UserRoutes } from '@azkaban/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserResponse, UsersResponse } from './user.model';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	private transformInternalServerError(error: string) {
		return {
			data: null,
			error,
			errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
		};
	}

	private transformBadRequestError(error: string) {
		return {
			data: null,
			error,
			errorCode: HttpStatus.BAD_REQUEST,
		};
	}

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
			return this.transformInternalServerError(error);
		}
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<UserResponse> {
		try {
			if (!id) {
				return this.transformBadRequestError('Id is required');
			}
			const response = await this.service.userById(id);
			return {
				data: response,
				error: null,
				errorCode: null,
			};
		} catch (error) {
			return this.transformInternalServerError(error);
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
				return this.transformBadRequestError('Username is required');
			} else if (!email) {
				return this.transformBadRequestError('Email is required');
			} else if (!password) {
				return this.transformBadRequestError('Password is required');
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
			return this.transformInternalServerError(error);
		}
	}
}
