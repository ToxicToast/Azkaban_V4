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
	UseGuards,
} from '@nestjs/common';
import { AzkabanUserTopics, ControllerHelper, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { UsersService } from './users.service';
import {
	CreateUserWithoutSaltDTO,
	UpdateUserDTO,
	UserDAO,
} from '@azkaban/azkaban-infrastructure';
import { JwtAuthGuard } from '../../../guards';
import { UsersPresenter } from './users.presenter';

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
				return data.map((user: UserDAO) => {
					const presenter = new UsersPresenter(user);
					return presenter.transform();
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
					const presenter = new UsersPresenter(data);
					return presenter.transform();
				}
				return null;
			});
	}

	@Span(AzkabanUserTopics.USERID + '.dementor')
	@Get('/uuid/:id')
	async getUserByUserId(@Param('id') id: string) {
		Logger.log('Get User By User Id', { id });
		return await this.service
			.userByUserId(id)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				if (data !== null) {
					const presenter = new UsersPresenter(data);
					return presenter.transform();
				}
				return null;
			});
	}

	@Span(AzkabanUserTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createUser(@Body() body: CreateUserWithoutSaltDTO) {
		Logger.log('Create New User', { body });
		return await this.service.createUser(body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.UPDATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Put('/:id')
	async updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
		Logger.log('Update User', { id, body });
		return await this.service.updateUser(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.DELETE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async deleteUser(@Param('id') id: number) {
		Logger.log('Delete User', { id });
		return await this.service.deleteUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.RESTORE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/restore/:id')
	async restoreUser(@Param('id') id: number) {
		Logger.log('Restore User', { id });
		return await this.service.restoreUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.ACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/activate/:id')
	async activateUser(@Param('id') id: number) {
		Logger.log('Activate User', { id });
		return await this.service.activateUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(AzkabanUserTopics.DEACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/deactivate/:id')
	async deactivateUser(@Param('id') id: number) {
		Logger.log('Deactivate User', { id });
		return await this.service.deactivateUser(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}
}
