import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Optional, WarcraftGuildTopics } from '@azkaban/shared';
import {
	CreateGuildDTO,
	UpdateGuildDTO,
} from '@azkaban/warcraft-infrastructure';
import { GuildIdQuery, IdQuery, ListQuery } from './queries';
import {
	ActivateCommand,
	CreateCommand,
	DeactivateCommand,
	DeleteCommand,
	RestoreCommand,
	UpdateCommand,
} from './commands';

@Injectable()
export class GuildService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Span(WarcraftGuildTopics.LIST + '.dementor')
	async guildList(limit?: Optional<number>, offset?: Optional<number>) {
		Logger.log('Fetch Guild List', { limit, offset });
		return await this.queryBus.execute(new ListQuery(limit, offset));
	}

	@Span(WarcraftGuildTopics.ID + '.dementor')
	async guildById(id: number) {
		Logger.log('Fetch Guild By Id', { id });
		return await this.queryBus.execute(new IdQuery(id));
	}

	@Span(WarcraftGuildTopics.GUILDID + '.dementor')
	async guildByGuildId(guild_id: string) {
		Logger.log('Fetch Guild By Guild Id', { guild_id });
		return await this.queryBus.execute(new GuildIdQuery(guild_id));
	}

	@Span(WarcraftGuildTopics.CREATE + '.dementor')
	async createGuild(data: CreateGuildDTO) {
		Logger.log('Create New Character', data);
		return await this.commandBus.execute(new CreateCommand(data));
	}

	@Span(WarcraftGuildTopics.UPDATE + '.dementor')
	async updateGuild(id: number, data: UpdateGuildDTO) {
		Logger.log('Update Character', { id, data });
		return await this.commandBus.execute(new UpdateCommand(id, data));
	}

	@Span(WarcraftGuildTopics.DELETE + '.dementor')
	async deleteGuild(id: number) {
		Logger.log('Delete Character', { id });
		return await this.commandBus.execute(new DeleteCommand(id));
	}

	@Span(WarcraftGuildTopics.RESTORE + '.dementor')
	async restoreGuild(id: number) {
		Logger.log('Restore Character', { id });
		return await this.commandBus.execute(new RestoreCommand(id));
	}

	@Span(WarcraftGuildTopics.ACTIVATE + '.dementor')
	async activateGuild(id: number) {
		Logger.log('Activate Character', { id });
		return await this.commandBus.execute(new ActivateCommand(id));
	}

	@Span(WarcraftGuildTopics.DEACTIVATE + '.dementor')
	async deactivateGuild(id: number) {
		Logger.log('Deactivate Character', { id });
		return await this.commandBus.execute(new DeactivateCommand(id));
	}
}
