import { Controller } from '@nestjs/common';
import { FoodfolioTopics, VersionService } from '@azkaban/shared';
import { MessagePattern } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { VersionCache } from './version.cache';

@Controller()
export class VersionController {
	constructor(
		private readonly versionService: VersionService,
		private readonly cache: VersionCache,
	) {}

	@Span(FoodfolioTopics.VERSION)
	@MessagePattern(FoodfolioTopics.VERSION)
	async getVersion(): Promise<string> {
		const version = this.versionService.appVersion();
		await this.cache.cacheVersion(version);
		return version;
	}
}
