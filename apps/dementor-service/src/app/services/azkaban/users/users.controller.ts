import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { AzkabanUserTopics, ControllerHelper, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { UsersService } from './users.service';
import {
	CreateUserDTO,
	CreateUserWithoutSaltDTO,
	UpdateUserDTO,
} from '@azkaban/azkaban-infrastructure';

@Controller(ControllerHelper('azkaban/users'))
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Span(AzkabanUserTopics.LIST + '.dementor')
	@Get('/')
	async getUsers(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		Logger.log('Get Users', { limit, offset });
		return await this.service
			.userList(limit, offset)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				Logger.log('Get Users', { data });
				return data.map((user) => {
					return {
						...user,
						password: undefined,
						salt: undefined,
					};
				});
			});
	}

	@Span(AzkabanUserTopics.ID + '.dementor')
	@Get('/:id')
	async getUserById(@Param('id') id: number) {
		Logger.log('Get User By Id', { id });
		return await this.service
			.userById(id)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				if (data !== null) {
					return {
						...data,
						password: undefined,
						salt: undefined,
					};
				}
				return null;
			});
	}

	@Span(AzkabanUserTopics.USERID + '.dementor')
	@Get('/uuid/:id')
	async getUserByUserId(@Param('id') id: string) {
		Logger.log('Get User By User Id', { id });
		return await this.service.userByUserId(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.CREATE + '.dementor')
	@Post('/')
	async createUser(@Body() body: CreateUserWithoutSaltDTO) {
		Logger.log('Create New User', { ...body, password: '********' });
		return await this.service.createUser(body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.UPDATE + '.dementor')
	@Put('/:id')
	async updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
		Logger.log('Update User', { id, body });
		return await this.service.updateUser(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.DELETE + '.dementor')
	@Delete('/:id')
	async deleteUser(@Param('id') id: number) {
		Logger.log('Delete User', { id });
		return await this.service.deleteUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.RESTORE + '.dementor')
	@Patch('/restore/:id')
	async restoreUser(@Param('id') id: number) {
		Logger.log('Restore User', { id });
		return await this.service.restoreUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.ACTIVATE + '.dementor')
	@Patch('/activate/:id')
	async activateUser(@Param('id') id: number) {
		Logger.log('Activate User', { id });
		return await this.service.activateUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.DEACTIVATE + '.dementor')
	@Patch('/deactivate/:id')
	async deactivateUser(@Param('id') id: number) {
		Logger.log('Deactivate User', { id });
		return await this.service.deactivateUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}
}
