import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { CharacterResponse, CharactersResponse } from '../responses';

@Injectable()
export class CharactersCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheCharacterList')
	async cacheCharacterList(characterList: CharactersResponse): Promise<void> {
		Logger.log('Cache Character List', characterList);
		await this.service.setKey('warcraft:characters:list', characterList);
	}

	@Span('cacheCharacterById')
	async cacheCharacterById(
		id: number,
		character: CharacterResponse,
	): Promise<void> {
		Logger.log('Cache Character By Id', { id, character });
		await this.service.setKey('warcraft:characters:id:' + id, character);
	}

	@Span('cacheCharacterByCharacterId')
	async cacheCharacterByCharacterId(
		character_id: string,
		character: CharacterResponse,
	): Promise<void> {
		Logger.log('Cache Character By Character Id', {
			character_id,
			character,
		});
		await this.service.setKey(
			'warcraft:characters:characterid:' + character_id,
			character,
		);
	}

	@Span('cacheCharactersByGuild')
	async cacheCharactersByGuild(
		guild: string,
		characters: CharactersResponse,
	): Promise<void> {
		Logger.log('Cache Characters By Guild', { guild, characters });
		await this.service.setKey(
			'warcraft:characters:guild:' + guild,
			characters,
		);
	}

	@Span('cacheCharactersByClass')
	async cacheCharactersByClass(
		character_class: string,
		characters: CharactersResponse,
	): Promise<void> {
		Logger.log('Cache Characters By Class', {
			class: character_class,
			characters,
		});
		await this.service.setKey(
			'warcraft:characters:class:' + character_class,
			characters,
		);
	}

	@Span('cacheCharactersByRace')
	async cacheCharactersByRace(
		race: string,
		characters: CharactersResponse,
	): Promise<void> {
		Logger.log('Cache Characters By Race', {
			race,
			characters,
		});
		await this.service.setKey(
			'warcraft:characters:race:' + race,
			characters,
		);
	}

	@Span('cacheCharactersByFaction')
	async cacheCharactersByFaction(
		faction: string,
		characters: CharactersResponse,
	): Promise<void> {
		Logger.log('Cache Characters By Faction', {
			faction,
			characters,
		});
		await this.service.setKey(
			'warcraft:characters:faction:' + faction,
			characters,
		);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		Logger.log('Clear Characters Cache', {});
		await this.service.deleteKey('warcraft:characters:*');
	}
}
