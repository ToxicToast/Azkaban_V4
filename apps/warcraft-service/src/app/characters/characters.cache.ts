import { Injectable } from '@nestjs/common';
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
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, characterList);
	}

	@Span('cacheCharacterById')
	async cacheCharacterById(
		character: CharacterResponse,
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:id:' + id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheCharacterByCharacterId')
	async cacheCharacterByCharacterId(
		character: CharacterResponse,
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:characterid:' + character_id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheCharactersByGuild')
	async cacheCharactersByGuild(
		characters: CharactersResponse,
		guild: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:guild:' + guild;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByClass')
	async cacheCharactersByClass(
		characters: CharactersResponse,
		character_class: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:class:' + character_class;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByRace')
	async cacheCharactersByRace(
		characters: CharactersResponse,
		race: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:race:' + race;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, characters);
	}

	@Span('cacheCharactersByFaction')
	async cacheCharactersByFaction(
		characters: CharactersResponse,
		faction: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:characters:faction:' + faction;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, characters);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('warcraft:characters:*');
	}
}
