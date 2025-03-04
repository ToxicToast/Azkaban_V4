import { Controller } from '@nestjs/common';
import { AzkabanUserTopics, Nullable, UserRoutes } from '@azkaban/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
		return await this.service.userList();
	}

	@MessagePattern(AzkabanUserTopics.ID)
	async id(@Payload('id') id: string): Promise<Nullable<UserModel>> {
		return await this.service.userById(id);
	}
}
