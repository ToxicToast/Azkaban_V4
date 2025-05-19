import { Inject, Injectable } from '@nestjs/common';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warhammer-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Span } from 'nestjs-otel';
import { Nullable, WarhammerCharacterTopics } from '@azkaban/shared';
import { CharactersCache } from './characters.cache';
import {
	CharacterByCharacterId,
	CharacterById,
	CharacterCreate,
	CharacterList,
} from '../../utils/dtos';

@Injectable()
export class CharactersService {
	private readonly infrastructureRepository: CharacterRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		private readonly cache: CharactersCache,
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterRepository: Repository<CharacterEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.infrastructureRepository = new CharacterRepository(
			this.characterRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
			this.eventEmitter,
		);
	}

	@Span(WarhammerCharacterTopics.LIST + '.service')
	async characterList(data: CharacterList): Promise<Array<CharacterDAO>> {
		const characters = await this.infrastructureService.getCharacterList(
			data.limit,
			data.offset,
			data.withDeleted,
		);
		await this.cache.cacheCharacterList(
			characters,
			data.limit,
			data.offset,
			data.withDeleted,
		);
		return characters;
	}

	@Span(WarhammerCharacterTopics.ID + '.service')
	async characterById(data: CharacterById): Promise<Nullable<CharacterDAO>> {
		const character = await this.infrastructureService.getCharacterById(
			data.id,
			data.withDeleted,
		);
		if (character !== null) {
			await this.cache.cacheCharacterById(
				character,
				data.id,
				data.withDeleted,
			);
			return character;
		}
		return null;
	}

	@Span(WarhammerCharacterTopics.CHARACTERID + '.service')
	async characterByCharacterId(
		data: CharacterByCharacterId,
	): Promise<Nullable<CharacterDAO>> {
		const character =
			await this.infrastructureService.getCharacterByCharacterId(
				data.character_id,
				data.withDeleted,
			);
		if (character !== null) {
			await this.cache.cacheCharacterByCharacterId(
				character,
				data.character_id,
				data.withDeleted,
			);
			return character;
		}
		return null;
	}

	@Span(WarhammerCharacterTopics.CREATE + '.service')
	async characterCreate(data: CharacterCreate): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.createCharacter(data.data);
	}
}
