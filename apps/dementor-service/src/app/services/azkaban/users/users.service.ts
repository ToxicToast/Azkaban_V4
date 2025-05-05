import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { AzkabanUserTopics, Optional } from '@azkaban/shared';
import {
	CreateUserWithoutSaltDTO,
	UpdateUserDTO,
} from '@azkaban/azkaban-infrastructure';
import { IdQuery, ListQuery } from './queries';
import { CreateCommand } from './commands';

@Injectable()
export class UsersService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Span(AzkabanUserTopics.LIST + '.dementor')
	async userList(limit?: Optional<number>, offset?: Optional<number>) {
		Logger.log('Fetch User List', { limit, offset });
		return await this.queryBus.execute(new ListQuery(limit, offset));
	}

	@Span(AzkabanUserTopics.ID + '.dementor')
	async userById(id: number) {
		Logger.log('Fetch User By Id', { id });
		return await this.queryBus.execute(new IdQuery(id));
	}

	@Span(AzkabanUserTopics.USERID + '.dementor')
	async userByUserId(user_id: string) {
		Logger.log('Fetch User By User Id', { user_id });
		// return await this.queryBus.execute(new UserIdQuery(user_id));
	}

	@Span(AzkabanUserTopics.CREATE + '.dementor')
	async createUser(data: CreateUserWithoutSaltDTO) {
		Logger.log('Create New User', data);
		return await this.commandBus.execute(new CreateCommand(data));
	}

	@Span(AzkabanUserTopics.UPDATE + '.dementor')
	async updateUser(id: number, data: UpdateUserDTO) {
		Logger.log('Update User', { id, data });
		// return await this.commandBus.execute(new UpdateCommand(id, data));
	}

	@Span(AzkabanUserTopics.DELETE + '.dementor')
	async deleteUser(id: number) {
		Logger.log('Delete User', { id });
		// return await this.commandBus.execute(new DeleteCommand(id));
	}

	@Span(AzkabanUserTopics.RESTORE + '.dementor')
	async restoreUser(id: number) {
		Logger.log('Restore User', { id });
		// return await this.commandBus.execute(new RestoreCommand(id));
	}

	@Span(AzkabanUserTopics.ACTIVATE + '.dementor')
	async activateUser(id: number) {
		Logger.log('Activate User', { id });
		// return await this.commandBus.execute(new ActivateCommand(id));
	}

	@Span(AzkabanUserTopics.DEACTIVATE + '.dementor')
	async deactivateUser(id: number) {
		Logger.log('Deactivate User', { id });
		// return await this.commandBus.execute(new DeactivateCommand(id));
	}
}
