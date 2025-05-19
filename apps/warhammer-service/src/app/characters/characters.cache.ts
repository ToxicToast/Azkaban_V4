import { Injectable } from '@nestjs/common';
import { CacheService, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
@Injectable()
export class CharactersCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheCharacterList')
	async cacheCharacterList(
		characterList: unknown,
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warhammer:characters:list';
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
		character: unknown,
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warhammer:characters:id:' + id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheCharacterByCharacterId')
	async cacheCharacterByCharacterId(
		character: unknown,
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warhammer:characters:characterid:' + character_id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, character);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('warhammer:characters:*');
	}
}
