import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Optional, WarcraftGuildTopics } from '@azkaban/shared';
import { CreateGuildDTO } from '@azkaban/warcraft-infrastructure';

@Injectable()
export class GuildService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Span(WarcraftGuildTopics.LIST + '.dementor')
	async guildList(limit?: Optional<number>, offset?: Optional<number>) {
		Logger.log('Fetch Guild List', { limit, offset });
	}

	@Span(WarcraftGuildTopics.ID + '.dementor')
	async guildById(id: number) {
		Logger.log('Fetch Guild By Id', { id });
	}

	@Span(WarcraftGuildTopics.GUILDID + '.dementor')
	async guildByGuildId(guild_id: string) {
		Logger.log('Fetch Guild By Guild Id', { guild_id });
	}

	@Span(WarcraftGuildTopics.CREATE + '.dementor')
	async createGuild(data: CreateGuildDTO) {
		Logger.log('Create New Character', data);
	}

	@Span(WarcraftGuildTopics.UPDATE + '.dementor')
	async updateGuild(id: number, data: unknown) {
		Logger.log('Update Character', { id, data });
	}

	@Span(WarcraftGuildTopics.DELETE + '.dementor')
	async deleteGuild(id: number) {
		Logger.log('Delete Character', { id });
	}

	@Span(WarcraftGuildTopics.RESTORE + '.dementor')
	async restoreGuild(id: number) {
		Logger.log('Restore Character', { id });
	}

	@Span(WarcraftGuildTopics.ACTIVATE + '.dementor')
	async activateGuild(id: number) {
		Logger.log('Activate Character', { id });
	}

	@Span(WarcraftGuildTopics.DEACTIVATE + '.dementor')
	async deactivateGuild(id: number) {
		Logger.log('Deactivate Character', { id });
	}
}
