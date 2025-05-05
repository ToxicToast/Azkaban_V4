import { Injectable, Logger } from '@nestjs/common';
import { CacheService, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { CharacterResponse, CharactersResponse } from '../../utils';

@Injectable()
export class CharactersCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheCharacterList')
	async cacheCharacterList(
		characterList: CharactersResponse,
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		await this.service.setKey(cacheKey, characterList);
	}

	@Span('cacheCharacterById')
	async cacheCharacterById(
		id: number,
		character: CharacterResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:id:' + id;
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheCharacterByCharacterId')
	async cacheCharacterByCharacterId(
		character_id: string,
		character: CharacterResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:characterid:' + character_id;
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheCharactersByGuild')
	async cacheCharactersByGuild(
		guild: string,
		characters: CharactersResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:guild:' + guild;
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByClass')
	async cacheCharactersByClass(
		character_class: string,
		characters: CharactersResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:class:' + character_class;
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByRace')
	async cacheCharactersByRace(
		race: string,
		characters: CharactersResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:race:' + race;
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByFaction')
	async cacheCharactersByFaction(
		faction: string,
		characters: CharactersResponse,
	): Promise<void> {
		const cacheKey = 'warcraft:characters:faction:' + faction;
		await this.service.setKey(cacheKey, characters);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('warcraft:characters:*');
	}
}
