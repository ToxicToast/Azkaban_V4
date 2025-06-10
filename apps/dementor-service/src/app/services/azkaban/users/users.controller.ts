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
import {
	AzkabanUserTopics,
	ControllerHelper,
	Nullable,
	Optional,
} from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { UsersService } from './users.service';
import {
	CreateUserWithoutSaltDTO,
	UpdateUserDTO,
	UserDAO,
} from '@azkaban/azkaban-infrastructure';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../../../guards';
import { UsersPresenter } from './users.presenter';
import { User } from '../../../decorators';

@Controller(ControllerHelper('azkaban/users'))
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Span(AzkabanUserTopics.LIST + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/')
	async getUsers(
		@User() user: Nullable<string>,
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		return await this.service
			.userList(limit, offset, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				return data.map((user: UserDAO) => {
					const presenter = new UsersPresenter(user, user !== null);
					return presenter.transform();
				});
			});
	}

	@Span(AzkabanUserTopics.ID + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/:id')
	async getUserById(@User() user: Nullable<string>, @Param('id') id: number) {
		return await this.service
			.userById(id, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				if (data !== null) {
					const presenter = new UsersPresenter(data, user !== null);
					return presenter.transform();
				}
				return null;
			});
	}

	@Span(AzkabanUserTopics.USERID + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/uuid/:id')
	async getUserByUserId(
		@User() user: Nullable<string>,
		@Param('id') id: string,
	) {
		return await this.service
			.userByUserId(id, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			})
			.then((data) => {
				if (data !== null) {
					const presenter = new UsersPresenter(data, user !== null);
					return presenter.transform();
				}
				return null;
			});
	}

	@Span(AzkabanUserTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createUser(@Body() body: CreateUserWithoutSaltDTO) {
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
