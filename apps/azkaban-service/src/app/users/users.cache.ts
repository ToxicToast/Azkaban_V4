import { Injectable, Logger } from '@nestjs/common';
import { CacheService, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { UserResponse, UsersResponse } from '../responses';

@Injectable()
export class UsersCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheUserList')
	async cacheUserList(
		characterList: UsersResponse,
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<void> {
		let cacheKey = 'azkaban:user:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		Logger.log('Cache User List', { cacheKey, characterList });
		await this.service.setKey(cacheKey, characterList);
	}

	@Span('cacheUserById')
	async cacheUserById(id: number, character: UserResponse): Promise<void> {
		const cacheKey = 'azkaban:user:id:' + id;
		Logger.log('Cache User By Id', { id, character });
		await this.service.setKey(cacheKey, character);
	}

	@Span('cacheUserByUserId')
	async cacheUserByUserId(
		character_id: string,
		character: UserResponse,
	): Promise<void> {
		const cacheKey = 'azkaban:user:characterid:' + character_id;
		Logger.log('Cache User By User Id', {
			character_id,
			character,
		});
		await this.service.setKey(cacheKey, character);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		Logger.log('Clear Users Cache', {});
		await this.service.deleteKey('azkaban:user:*');
	}
}
