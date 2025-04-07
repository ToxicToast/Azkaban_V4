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
} from '../dtos';
import { CharactersCache } from './characters.cache';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
	private readonly infrastructureRepository: CharacterRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		private readonly cache: CharactersCache,
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterRepository: Repository<CharacterEntity>,
	) {
		this.infrastructureRepository = new CharacterRepository(
			this.characterRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	@Span('characterList')
	async characterList(data: CharacterList): Promise<Array<CharacterDAO>> {
		Logger.log('CharacterList', data);
		const characters = await this.infrastructureService.getCharacterList(
			data.limit,
			data.offset,
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharacterList(
			characters,
			data.limit,
			data.offset,
		);
		return characters;
	}

	@Span('characterById')
	async characterById(data: CharacterByIdDTO) {
		Logger.log('CharacterById', data);
		const character = await this.infrastructureService.getCharacterById(
			data.id,
		);
		Logger.log('character', character);
		if (character !== null) {
			await this.cache.cacheCharacterById(data.id, character);
			return character;
		}
		return null;
	}

	@Span('characterByCharacterId')
	async characterByCharacterId(data: CharacterByCharacterIdDTO) {
		Logger.log('CharacterByCharacterId', data);
		const character =
			await this.infrastructureService.getCharacterByCharacterId(
				data.character_id,
			);
		Logger.log('character', character);
		if (character !== null) {
			await this.cache.cacheCharacterByCharacterId(
				data.character_id,
				character,
			);
			return character;
		}
		return null;
	}

	@Span('characterByGuild')
	async characterByGuild(data: CharacterByGuildDTO) {
		Logger.log('characterByGuild', data);
		const characters = await this.infrastructureService.getCharacterByGuild(
			data.guild,
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByGuild(data.guild, characters);
		return characters;
	}

	@Span('characterByClass')
	async characterByClass(data: CharacterByClassDTO) {
		Logger.log('characterByClass', data);
		const characters =
			await this.infrastructureService.getCharactersByClass(
				data.character_class,
			);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByClass(
			data.character_class,
			characters,
		);
		return characters;
	}

	@Span('characterByRace')
	async characterByRace(data: CharacterByRaceDTO) {
		Logger.log('characterByRace', data);
		const characters = await this.infrastructureService.getCharactersByRace(
			data.race,
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByRace(data.race, characters);
		return characters;
	}

	@Span('characterByFaction')
	async characterByFaction(data: CharacterByFactionDTO) {
		Logger.log('characterByFaction', data);
		const characters =
			await this.infrastructureService.getCharactersByFaction(
				data.faction,
			);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByRace(data.faction, characters);
		return characters;
	}

	@Span('characterCreate')
	async characterCreate(data: CharacterCreateDTO) {
		Logger.log('CharacterCreate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.createCharacter(data);
	}

	@Span('characterUpdate')
	async characterUpdate(data: CharacterUpdateDTO) {
		Logger.log('CharacterUpdate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.updateCharacter(data.id, data);
	}

	@Span('characterDelete')
	async characterDelete(data: CharacterByIdDTO) {
		Logger.log('CharacterDelete', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deleteCharacter(data.id);
	}

	@Span('characterRestore')
	async characterRestore(data: CharacterByIdDTO) {
		Logger.log('CharacterRestore', data);
		await this.cache.removeCache();
		return await this.infrastructureService.restoreCharacter(data.id);
	}

	@Span('characterActivate')
	async characterActivate(data: CharacterByIdDTO) {
		Logger.log('CharacterActivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.activateCharacter(data.id);
	}

	@Span('characterDeactivate')
	async characterDeactivate(data: CharacterByIdDTO) {
		Logger.log('characterDeactivate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.deactivateCharacter(data.id);
	}
}
