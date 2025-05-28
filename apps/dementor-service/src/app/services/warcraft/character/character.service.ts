import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Nullable, Optional, WarcraftCharacterTopics } from '@azkaban/shared';
import {
	CreateCharacterDTO,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import {
	ActivateCommand,
	AssignCommand,
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
	async characterList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	) {
		return await this.queryBus.execute(
			new ListQuery(limit, offset, withDeleted),
		);
	}

	@Span(WarcraftCharacterTopics.ID + '.dementor')
	async characterById(id: number, withDeleted?: Optional<boolean>) {
		return await this.queryBus.execute(new IdQuery(id, withDeleted));
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.dementor')
	async characterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	) {
		return await this.queryBus.execute(
			new CharacterIdQuery(character_id, withDeleted),
		);
	}

	@Span(WarcraftCharacterTopics.GUILD + '.dementor')
	async characterByGuild(
		guild: Nullable<string>,
		withDeleted?: Optional<boolean>,
	) {
		return await this.queryBus.execute(new GuildQuery(guild, withDeleted));
	}

	@Span(WarcraftCharacterTopics.CREATE + '.dementor')
	async createCharacter(data: CreateCharacterDTO) {
		return await this.commandBus.execute(new CreateCommand(data));
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.dementor')
	async updateCharacter(id: number, data: UpdateCharacterDTO) {
		return await this.commandBus.execute(new UpdateCommand(id, data));
	}

	@Span(WarcraftCharacterTopics.DELETE + '.dementor')
	async deleteCharacter(id: number) {
		return await this.commandBus.execute(new DeleteCommand(id));
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.dementor')
	async restoreCharacter(id: number) {
		return await this.commandBus.execute(new RestoreCommand(id));
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.dementor')
	async activateCharacter(id: number) {
		return await this.commandBus.execute(new ActivateCommand(id));
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.dementor')
	async deactivateCharacter(id: number) {
		return await this.commandBus.execute(new DeactivateCommand(id));
	}

	@Span(WarcraftCharacterTopics.ASSIGN + '.dementor')
	async assignCharacter(id: number, user_id: Nullable<string>) {
		return await this.commandBus.execute(new AssignCommand(id, user_id));
	}
}
