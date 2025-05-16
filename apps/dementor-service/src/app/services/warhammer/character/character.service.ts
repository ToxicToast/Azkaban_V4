import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Optional, WarhammerCharacterTopics } from '@azkaban/shared';

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
		Logger.log({
			limit,
			offset,
			withDeleted,
		});
	}

	@Span(WarhammerCharacterTopics.ID + '.dementor')
	async characterById(id: number, withDeleted?: Optional<boolean>) {
		Logger.log({
			id,
			withDeleted,
		});
	}

	@Span(WarhammerCharacterTopics.CHARACTERID + '.dementor')
	async characterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	) {
		Logger.log({
			character_id,
			withDeleted,
		});
	}
}
