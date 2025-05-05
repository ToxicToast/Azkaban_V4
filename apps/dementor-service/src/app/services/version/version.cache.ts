import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from '@azkaban/shared';
import { Span } from 'nestjs-otel';

@Injectable()
export class VersionCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheVersion')
	async cacheVersion(version: string): Promise<void> {
		const cacheKey = 'version:dementor';
		Logger.log(`Cache version:`, { cacheKey, version });
		await this.service.setKey(cacheKey, version);
	}
}
