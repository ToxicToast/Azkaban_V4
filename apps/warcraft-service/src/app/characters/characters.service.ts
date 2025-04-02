import { Injectable, Logger } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import {
	CharacterByCharacterIdDTO,
	CharacterByGuildDTO,
	CharacterByIdDTO,
	CharacterCreateDTO,
	CharacterUpdateDTO,
} from '../dtos';
import { CharactersCache } from './characters.cache';

@Injectable()
export class CharactersService {
	constructor(private readonly cache: CharactersCache) {}

	@Span('characterList')
	async characterList() {
		Logger.log('CharacterList');
		await this.cache.cacheCharacterList([]);
	}

	@Span('characterById')
	async characterById(data: CharacterByIdDTO) {
		Logger.log('CharacterById', data);
		await this.cache.cacheCharacterById(data.id, null);
	}

	@Span('characterByCharacterId')
	async characterByCharacterId(data: CharacterByCharacterIdDTO) {
		Logger.log('CharacterByCharacterId', data);
		await this.cache.cacheCharacterByCharacterId(data.character_id, null);
	}

	@Span('characterByGuild')
	async characterByGuild(data: CharacterByGuildDTO) {
		Logger.log('characterByGuild', data);
		await this.cache.cacheCharactersByGuild(data.guild, []);
	}

	@Span('characterCreate')
	async characterCreate(data: CharacterCreateDTO) {
		Logger.log('CharacterCreate', data);
		await this.cache.removeCache();
	}

	@Span('characterUpdate')
	async characterUpdate(data: CharacterUpdateDTO) {
		Logger.log('CharacterUpdate', data);
		await this.cache.removeCache();
	}

	@Span('characterDelete')
	async characterDelete(data: CharacterByIdDTO) {
		Logger.log('CharacterDelete', data);
		await this.cache.removeCache();
	}

	@Span('characterRestore')
	async characterRestore(data: CharacterByIdDTO) {
		Logger.log('CharacterRestore', data);
		await this.cache.removeCache();
	}
}
