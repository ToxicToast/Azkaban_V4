import { Injectable } from '@nestjs/common';
import { CacheService } from '@azkaban/shared';
import { UserResponse, UsersResponse } from './user.model';

@Injectable()
export class UserCache {
	constructor(private readonly cacheService: CacheService) {}

	async cacheUserList(userList: UsersResponse): Promise<void> {
		await this.cacheService.setKey('azkaban:users:list', userList);
	}

	async cacheUserById(id: string, user: UserResponse): Promise<void> {
		await this.cacheService.setKey('azkaban:user:' + id, user);
	}

	async removeCacheOnCreate(): Promise<void> {
		await this.cacheService.deleteKey('azkaban:users:list');
		await this.cacheService.deleteKey('azkaban:user:*');
	}
}
