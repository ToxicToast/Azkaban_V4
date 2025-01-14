import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthTopics, CacheService, NotificationTopics } from '@azkaban/shared';
import { VersionQuery } from './queries';

@Injectable()
export class VersionService {
	constructor(
		@Inject('APP_VERSION') private readonly appVersion: string,
		private readonly cacheService: CacheService,
		private readonly queryBus: QueryBus,
	) {}

	private async authVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AuthTopics.VERSION),
		);
	}

	private async notificationVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(NotificationTopics.VERSION),
		);
	}

	private gatewayVersion(): string {
		return this.appVersion;
	}

	private async buildVersionJson(): Promise<unknown> {
		const cacheKey = 'azkaban.gateway.version';
		const inCache = await this.cacheService.inCache(cacheKey);
		if (!inCache) {
			const gateway = this.gatewayVersion();
			const auth = await this.authVersion();
			const notification = await this.notificationVersion();
			//
			const versions = {
				gateway,
				azkaban: {
					auth,
					notification,
				},
			};
			//
			await this.cacheService.setKey(cacheKey, versions);
			return versions;
		}
		return this.cacheService.getKey(cacheKey);
	}

	async generateVersions(): Promise<unknown> {
		return await this.buildVersionJson();
	}
}
