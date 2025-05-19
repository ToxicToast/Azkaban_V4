import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Optional, WarhammerCharacterTopics } from '@azkaban/shared';
import { CharacterIdQuery, IdQuery, ListQuery } from './queries';
import { CreateCharacterDTO } from '@azkaban/warhammer-infrastructure';
import { CreateCommand } from './commands';

@Injectable()
export class CharacterService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Span(WarhammerCharacterTopics.LIST + '.dementor')
	async characterList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	) {
		return await this.queryBus.execute(
			new ListQuery(limit, offset, withDeleted),
		);
	}

	@Span(WarhammerCharacterTopics.ID + '.dementor')
	async characterById(id: number, withDeleted?: Optional<boolean>) {
		return await this.queryBus.execute(new IdQuery(id, withDeleted));
	}

	@Span(WarhammerCharacterTopics.CHARACTERID + '.dementor')
	async characterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	) {
		return await this.queryBus.execute(
			new CharacterIdQuery(character_id, withDeleted),
		);
	}

	@Span(WarhammerCharacterTopics.CREATE + '.dementor')
	async createCharacter(data: CreateCharacterDTO) {
		return await this.commandBus.execute(new CreateCommand(data));
	}
}
