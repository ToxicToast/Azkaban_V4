import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get()
	async getUsers() {
		return await this.service.getUsers();
	}

	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return await this.service.getUserById(id);
	}

	@Post()
	async createUser(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.createUser(email, username, password);
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body('username') username?: Optional<string>,
		@Body('password') password?: Optional<string>,
	) {
		return await this.service.updateUser(id, username, password);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		return await this.service.deleteUser(id);
	}

	@Put('restore/:id')
	async restoreUser(@Param('id') id: string) {
		return await this.service.restoreUser(id);
	}
}
