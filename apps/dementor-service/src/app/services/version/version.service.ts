import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import {
	WarcraftTopics,
	AzkabanTopics,
	CacheService,
	WarhammerTopics,
} from '@azkaban/shared';
import {
	AzkabanVersionQuery,
	DementorVersionQuery,
	WarcraftVersionQuery,
	WarhammerVersionQuery,
} from './queries';

@Injectable()
export class VersionService {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly cache: CacheService,
	) {}

	@Span(WarhammerTopics.VERSION)
	async getWarhammerServiceVersion() {
		Logger.log('Fetch Warhammer Service Version');
		return await this.queryBus.execute(new WarhammerVersionQuery());
	}

	@Span(WarcraftTopics.VERSION)
	async getWarcraftServiceVersion() {
		Logger.log('Fetch Warcraft Service Version');
		return await this.queryBus.execute(new WarcraftVersionQuery());
	}

	@Span(AzkabanTopics.VERSION)
	async getAzkabanServiceVersion() {
		Logger.log('Fetch Azkaban Service Version');
		return await this.queryBus.execute(new AzkabanVersionQuery());
	}

	@Span('dementor.version')
	async getDementorServiceVersion() {
		Logger.log('Fetch Dementor Service Version');
		return await this.queryBus.execute(new DementorVersionQuery());
	}

	private async checkForCache() {
		const cacheKey = 'version:system';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		//
		const azkabanVersion = await this.getAzkabanServiceVersion().catch(
			() => {
				return 'n/a';
			},
		);
		const dementorVersion = await this.getDementorServiceVersion().catch(
			() => {
				return 'n/a';
			},
		);
		const warcraftVersion = await this.getWarcraftServiceVersion().catch(
			() => {
				return 'n/a';
			},
		);
		const warhammerVersion = await this.getWarhammerServiceVersion().catch(
			() => {
				return 'n/a';
			},
		);
		const versions = {
			dementor: dementorVersion,
			azkaban: {
				alerts: azkabanVersion,
				groups: 'n/a',
				users: azkabanVersion,
				auth: azkabanVersion,
			},
			sse: 'n/a',
			warcraft: {
				api: warcraftVersion,
				characters: warcraftVersion,
				guilds: warcraftVersion,
				cronjobs: {
					assets: warcraftVersion,
					character: warcraftVersion,
					guild: 'n/a',
					mythic: warcraftVersion,
					raid: 'n/a',
				},
			},
			warhammer: {
				characters: warhammerVersion,
				origins: 'n/a',
				fractions: 'n/a',
				roles: 'n/a',
				equipmenmt: 'n/a',
				skills: 'n/a',
				talents: 'n/a',
			},
		};
		await this.cache.setKey(cacheKey, versions);
		return versions;
	}

	async getVersions() {
		return await this.checkForCache();
	}
}
