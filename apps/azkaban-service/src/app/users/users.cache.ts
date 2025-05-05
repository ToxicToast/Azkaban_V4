import { Injectable, Logger } from '@nestjs/common';
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
	): Promise<void> {
		let cacheKey = 'azkaban:users:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		Logger.log('Cache User List', { cacheKey, userList });
		await this.service.setKey(cacheKey, userList);
	}

	@Span('cacheUserById')
	async cacheUserById(id: number, user: UserResponse): Promise<void> {
		const cacheKey = 'azkaban:users:id:' + id;
		Logger.log('Cache User By Id', { id, user });
		await this.service.setKey(cacheKey, user);
	}

	@Span('cacheUserByUserId')
	async cacheUserByUserId(
		user_id: string,
		user: UserResponse,
	): Promise<void> {
		const cacheKey = 'azkaban:users:userid:' + user_id;
		Logger.log('Cache User By User Id', {
			user_id,
			user,
		});
		await this.service.setKey(cacheKey, user);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		Logger.log('Clear Users Cache', {});
		await this.service.deleteKey('azkaban:users:*');
	}
}
