import { Injectable } from '@nestjs/common';
import { CacheService } from '@azkaban/shared';

@Injectable()
export class AuthCache {
	constructor(private readonly cacheService: CacheService) {}

	async removeCacheOnCreate(): Promise<void> {
		await this.cacheService.deleteKey('azkaban:users:list');
		await this.cacheService.deleteKey('azkaban:user:*');
	}
}
