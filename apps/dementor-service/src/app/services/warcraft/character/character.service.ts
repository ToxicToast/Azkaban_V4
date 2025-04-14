import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Nullable, Optional, WarcraftCharacterTopics } from '@azkaban/shared';
import {
	CreateCharacterDTO,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import {
	ActivateCommand,
	CreateCommand,
	DeactivateCommand,
	DeleteCommand,
	RestoreCommand,
	UpdateCommand,
} from './commands';
import { ListQuery, IdQuery, CharacterIdQuery, GuildQuery } from './queries';

@Injectable()
export class CharacterService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Span(WarcraftCharacterTopics.LIST + '.dementor')
	async characterList(limit?: Optional<number>, offset?: Optional<number>) {
		Logger.log('Fetch Character List', { limit, offset });
		return await this.queryBus.execute(new ListQuery(limit, offset));
	}

	@Span(WarcraftCharacterTopics.ID + '.dementor')
	async characterById(id: number) {
		Logger.log('Fetch Character By Id', { id });
		return await this.queryBus.execute(new IdQuery(id));
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.dementor')
	async characterByCharacterId(character_id: string) {
		Logger.log('Fetch Character By Character Id', { character_id });
		return await this.queryBus.execute(new CharacterIdQuery(character_id));
	}

	@Span(WarcraftCharacterTopics.GUILD + '.dementor')
	async characterByGuild(guild: Nullable<string>) {
		Logger.log('Fetch Character By Guild', { guild });
		return await this.queryBus.execute(new GuildQuery(guild));
	}

	@Span(WarcraftCharacterTopics.CREATE + '.dementor')
	async createCharacter(data: CreateCharacterDTO) {
		Logger.log('Create New Character', data);
		return await this.commandBus.execute(new CreateCommand(data));
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.dementor')
	async updateCharacter(id: number, data: UpdateCharacterDTO) {
		Logger.log('Update Character', { id, data });
		return await this.commandBus.execute(new UpdateCommand(id, data));
	}

	@Span(WarcraftCharacterTopics.DELETE + '.dementor')
	async deleteCharacter(id: number) {
		Logger.log('Delete Character', { id });
		return await this.commandBus.execute(new DeleteCommand(id));
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.dementor')
	async restoreCharacter(id: number) {
		Logger.log('Restore Character', { id });
		return await this.commandBus.execute(new RestoreCommand(id));
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.dementor')
	async activateCharacter(id: number) {
		Logger.log('Activate Character', { id });
		return await this.commandBus.execute(new ActivateCommand(id));
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.dementor')
	async deactivateCharacter(id: number) {
		Logger.log('Deactivate Character', { id });
		return await this.commandBus.execute(new DeactivateCommand(id));
	}
}
