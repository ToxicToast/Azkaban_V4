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

	async removeCache(): Promise<void> {
		Logger.log('Clear Characters Cache', {});
		await this.service.deleteKey('warcraft:characters:*');
	}
}
