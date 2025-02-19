import { Controller } from '@nestjs/common';
import { AzkabanUserTopics, UserRoutes } from '@azkaban/shared';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	@MessagePattern(AzkabanUserTopics.LIST)
	async list(): Promise<Array<unknown>> {
		return await this.service.userList();
	}
}
