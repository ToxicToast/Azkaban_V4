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
	async characterById(data: CharacterByIdDTO): Promise<CharacterDAO> {
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
	async characterByCharacterId(
		data: CharacterByCharacterIdDTO,
	): Promise<CharacterDAO> {
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
	async characterByGuild(
		data: CharacterByGuildDTO,
	): Promise<Array<CharacterDAO>> {
		Logger.log('characterByGuild', data);
		const characters = await this.infrastructureService.getCharacterByGuild(
			data.guild,
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByGuild(data.guild, characters);
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
			);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByClass(
			data.character_class,
			characters,
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
		);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByRace(data.race, characters);
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
			);
		Logger.log('characters', characters);
		await this.cache.cacheCharactersByRace(data.faction, characters);
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
