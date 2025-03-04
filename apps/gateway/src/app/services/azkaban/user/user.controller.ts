import { Controller, Get, Param } from '@nestjs/common';
import { Nullable, UserRoutes } from '@azkaban/shared';
import { UserService } from './user.service';
import { UserDAO } from '@azkaban/user-infrastructure';

@Controller({
	path: UserRoutes.CONTROLLER,
	version: '1',
})
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get(UserRoutes.INDEX)
	async getList(): Promise<Array<UserDAO>> {
		return await this.service.userList();
	}

	@Get(UserRoutes.BYID)
	async getById(@Param('id') id: string): Promise<Nullable<UserDAO>> {
		return await this.service.userById(id);
	}
}
