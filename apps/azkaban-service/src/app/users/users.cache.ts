import { Injectable } from '@nestjs/common';
import { CacheService, Optional } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { UserResponse, UsersResponse } from '../../utils';

@Injectable()
export class UsersCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheUserList')
	async cacheUserList(
		userList: UsersResponse,
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'azkaban:users:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, userList);
	}

	@Span('cacheUserById')
	async cacheUserById(
		user: UserResponse,
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'azkaban:users:id:' + id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, user);
	}

	@Span('cacheUserByUserId')
	async cacheUserByUserId(
		user: UserResponse,
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'azkaban:users:userid:' + user_id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, user);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('azkaban:users:*');
	}
}
