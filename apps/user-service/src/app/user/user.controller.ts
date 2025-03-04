import { Controller } from '@nestjs/common';
import { AzkabanUserTopics, Nullable, UserRoutes } from '@azkaban/shared';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	@MessagePattern(AzkabanUserTopics.LIST)
	async list(): Promise<Array<UserModel>> {
		try {
			return await this.service.userList();
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<Nullable<UserModel>> {
		try {
			if (!id) {
				throw new RpcException('Id is required');
			}
			return await this.service.userById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(AzkabanUserTopics.CREATE)
	async create(
		@Payload('username') username: string,
		@Payload('email') email: string,
		@Payload('password') password: string,
	): Promise<Nullable<UserModel>> {
		try {
			return await this.service.userCreate(username, email, password);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
