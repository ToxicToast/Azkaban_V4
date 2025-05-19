import { Inject, Injectable } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import {
	CharacterByCharacterIdDTO,
	CharacterByClassDTO,
	CharacterByFactionDTO,
	CharacterByGuildDTO,
	CharacterByIdDTO,
	CharacterByRaceDTO,
	CharacterCreateDTO,
	CharacterList,
	CharacterUpdateDTO,
} from '../../utils';
import { CharactersCache } from './characters.cache';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Nullable, WarcraftCharacterTopics } from '@azkaban/shared';

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

	@Span(WarcraftCharacterTopics.LIST + '.service')
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

	@Span(WarcraftCharacterTopics.ID + '.service')
	async characterById(
		data: CharacterByIdDTO,
	): Promise<Nullable<CharacterDAO>> {
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

	@Span(WarcraftCharacterTopics.CHARACTERID + '.service')
	async characterByCharacterId(
		data: CharacterByCharacterIdDTO,
	): Promise<CharacterDAO> {
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

	@Span(WarcraftCharacterTopics.GUILD + '.service')
	async characterByGuild(
		data: CharacterByGuildDTO,
	): Promise<Array<CharacterDAO>> {
		const characters = await this.infrastructureService.getCharacterByGuild(
			data.guild,
			data.withDeleted,
		);
		await this.cache.cacheCharactersByGuild(
			characters,
			data.guild,
			data.withDeleted,
		);
		return characters;
	}

	@Span('characterByClass')
	async characterByClass(
		data: CharacterByClassDTO,
	): Promise<Array<CharacterDAO>> {
		const characters =
			await this.infrastructureService.getCharactersByClass(
				data.character_class,
				data.withDeleted,
			);
		await this.cache.cacheCharactersByClass(
			characters,
			data.character_class,
			data.withDeleted,
		);
		return characters;
	}

	@Span('characterByRace')
	async characterByRace(
		data: CharacterByRaceDTO,
	): Promise<Array<CharacterDAO>> {
		const characters = await this.infrastructureService.getCharactersByRace(
			data.race,
			data.withDeleted,
		);
		await this.cache.cacheCharactersByRace(
			characters,
			data.race,
			data.withDeleted,
		);
		return characters;
	}

	@Span('characterByFaction')
	async characterByFaction(
		data: CharacterByFactionDTO,
	): Promise<Array<CharacterDAO>> {
		const characters =
			await this.infrastructureService.getCharactersByFaction(
				data.faction,
				data.withDeleted,
			);
		await this.cache.cacheCharactersByRace(
			characters,
			data.faction,
			data.withDeleted,
		);
		return characters;
	}

	@Span(WarcraftCharacterTopics.CREATE + '.service')
	async characterCreate(data: CharacterCreateDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.createCharacter(data.data);
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.service')
	async characterUpdate(data: CharacterUpdateDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.updateCharacter(
			data.id,
			data.data,
		);
	}

	@Span(WarcraftCharacterTopics.DELETE + '.service')
	async characterDelete(data: CharacterByIdDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.deleteCharacter(data.id);
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.service')
	async characterRestore(data: CharacterByIdDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.restoreCharacter(data.id);
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.service')
	async characterActivate(data: CharacterByIdDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.activateCharacter(data.id);
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.service')
	async characterDeactivate(data: CharacterByIdDTO): Promise<CharacterDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.deactivateCharacter(data.id);
	}
}
