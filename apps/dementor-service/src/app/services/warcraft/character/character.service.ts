import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Nullable, Optional, WarcraftCharacterTopics } from '@azkaban/shared';
import {
	CreateCharacterDTO,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import { CreateCommand, ListCommand } from './commands';

@Injectable()
export class CharacterService {
	constructor(private readonly commandBus: CommandBus) {}

	@Span(WarcraftCharacterTopics.LIST + '.dementor')
	async characterList(limit?: Optional<number>, offset?: Optional<number>) {
		Logger.log('Fetch Character List', { limit, offset });
		return await this.commandBus.execute(new ListCommand(limit, offset));
	}

	@Span(WarcraftCharacterTopics.ID + '.dementor')
	async characterById(id: number) {
		Logger.log('Fetch Character By Id', { id });
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.dementor')
	async characterByCharacterId(character_id: string) {
		Logger.log('Fetch Character By Character Id', { character_id });
	}

	@Span(WarcraftCharacterTopics.GUILD + '.dementor')
	async characterByGuild(guild: Nullable<string>) {
		Logger.log('Fetch Character By Guild', { guild });
	}

	@Span(WarcraftCharacterTopics.CREATE + '.dementor')
	async createCharacter(data: CreateCharacterDTO) {
		Logger.log('Create New Character', data);
		return await this.commandBus.execute(
			new CreateCommand(data.region, data.realm, data.name),
		);
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.dementor')
	async updateCharacter(id: number, data: UpdateCharacterDTO) {
		Logger.log('Update Character', { id, data });
	}

	@Span(WarcraftCharacterTopics.DELETE + '.dementor')
	async deleteCharacter(id: number) {
		Logger.log('Delete Character', { id });
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.dementor')
	async restoreCharacter(id: number) {
		Logger.log('Restore Character', { id });
	}
}
