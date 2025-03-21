import { Injectable } from '@nestjs/common';
import { CacheService } from '@azkaban/shared';
import { CharacterResponse, CharactersResponse } from './character.model';

@Injectable()
export class CharacterCache {
	constructor(private readonly cacheService: CacheService) {}

	async cacheCharacterList(characterList: CharactersResponse): Promise<void> {
		await this.cacheService.setKey(
			'warcraft:characters:list',
			characterList,
		);
	}

	async cacheCharacterById(
		id: string,
		character: CharacterResponse,
	): Promise<void> {
		await this.cacheService.setKey('warcraft:character:' + id, character);
	}

	async removeCacheOnCreate(): Promise<void> {
		await this.cacheService.deleteKey('warcraft:characters:list');
		await this.cacheService.deleteKey('warcraft:character:*');
	}
}
