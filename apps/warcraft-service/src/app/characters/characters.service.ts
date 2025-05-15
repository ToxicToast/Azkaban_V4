import { Inject, Injectable, Logger } from '@nestjs/common';
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

	@Span('characterList')
	async characterList(data: CharacterList): Promise<Array<CharacterDAO>> {
		const characters = await this.infrastructureService.getCharacterList(
			data.limit,
			data.offset,
			data.withDeleted,
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharacterList(
			characters,
			data.limit,
			data.offset,
			data.withDeleted,
		);
		return characters;
	}

	@Span('characterById')
	async characterById(data: CharacterByIdDTO): Promise<CharacterDAO> {
		Logger.log('CharacterById', data);
		const character = await this.infrastructureService.getCharacterById(
			data.id,
			data.withDeleted,
		);
		Logger.log('character', character);
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

	@Span('characterByCharacterId')
	async characterByCharacterId(
		data: CharacterByCharacterIdDTO,
	): Promise<CharacterDAO> {
		Logger.log('CharacterByCharacterId', data);
		const character =
			await this.infrastructureService.getCharacterByCharacterId(
				data.character_id,
				data.withDeleted,
			);
		Logger.log('character', character);
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

	@Span('characterByGuild')
	async characterByGuild(
		data: CharacterByGuildDTO,
	): Promise<Array<CharacterDAO>> {
		Logger.log('characterByGuild', data);
		const characters = await this.infrastructureService.getCharacterByGuild(
			data.guild,
			data.withDeleted,
		);
		Logger.log('characters', characters);
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
		Logger.log('characterByClass', data);
		const characters =
			await this.infrastructureService.getCharactersByClass(
				data.character_class,
				data.withDeleted,
			);
		Logger.log('characters', characters);
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
		Logger.log('characterByRace', data);
		const characters = await this.infrastructureService.getCharactersByRace(
			data.race,
			data.withDeleted,
		);
		Logger.log('characters', characters);
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
		Logger.log('characterByFaction', data);
		const characters =
			await this.infrastructureService.getCharactersByFaction(
				data.faction,
				data.withDeleted,
			);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByRace(
			characters,
			data.faction,
			data.withDeleted,
		);
		return characters;
	}

	@Span('characterCreate')
	async characterCreate(data: CharacterCreateDTO): Promise<CharacterDAO> {
		Logger.log('CharacterCreate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.createCharacter(data);
	}

	@Span('characterUpdate')
	async characterUpdate(data: CharacterUpdateDTO): Promise<CharacterDAO> {
		Logger.log('CharacterUpdate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.updateCharacter(
			data.id,
			data.data,
		);
	}

	@Span('characterDelete')
	async characterDelete(data: CharacterByIdDTO): Promise<CharacterDAO> {
		Logger.log('CharacterDelete', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deleteCharacter(data.id);
	}

	@Span('characterRestore')
	async characterRestore(data: CharacterByIdDTO): Promise<CharacterDAO> {
		Logger.log('CharacterRestore', data);
		await this.cache.removeCache();
		return await this.infrastructureService.restoreCharacter(data.id);
	}

	@Span('characterActivate')
	async characterActivate(data: CharacterByIdDTO): Promise<CharacterDAO> {
		Logger.log('CharacterActivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.activateCharacter(data.id);
	}

	@Span('characterDeactivate')
	async characterDeactivate(data: CharacterByIdDTO): Promise<CharacterDAO> {
		Logger.log('characterDeactivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deactivateCharacter(data.id);
	}
}
