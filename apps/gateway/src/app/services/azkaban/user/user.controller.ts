import { Controller, Get } from '@nestjs/common';
import { UserRoutes } from '@azkaban/shared';
import { UserService } from './user.service';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get(UserRoutes.INDEX)
	async getList(): Promise<unknown> {
		return await this.service.userList();
	}
}
