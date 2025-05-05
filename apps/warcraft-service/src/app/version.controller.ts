import { Controller } from '@nestjs/common';
import { VersionService, WarcraftTopics } from '@azkaban/shared';
import { MessagePattern } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { VersionCache } from './version.cache';

@Controller()
export class VersionController {
	constructor(
		private readonly versionService: VersionService,
		private readonly cache: VersionCache,
	) {}

	@Span(WarcraftTopics.VERSION)
	@MessagePattern(WarcraftTopics.VERSION)
	async getVersion(): Promise<string> {
		const version = this.versionService.appVersion();
		await this.cache.cacheVersion(version);
		return version;
	}
}
