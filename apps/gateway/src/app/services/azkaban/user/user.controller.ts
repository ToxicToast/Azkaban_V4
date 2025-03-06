import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
		return await this.service.userList().catch((error) => {
			throw error;
		});
	}

	@Get(UserRoutes.BYID)
	async getById(@Param('id') id: string): Promise<Nullable<UserDAO>> {
		return await this.service.userById(id).catch((error) => {
			throw error;
		});
	}

	@Post(UserRoutes.INDEX)
	async create(
		@Body('username') username: string,
		@Body('email') email: string,
		@Body('password') password: string,
	): Promise<UserDAO> {
		return await this.service
			.createUser(username, email, password)
			.catch((error) => {
				throw error;
			});
	}
}
