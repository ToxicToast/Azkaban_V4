import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import {
	WarcraftTopics,
	AzkabanTopics,
	CacheService,
	WarhammerTopics,
	FoodfolioTopics,
} from '@azkaban/shared';
import {
	AzkabanVersionQuery,
	DementorVersionQuery,
	FoodfolioVersionQuery,
	WarcraftVersionQuery,
	WarhammerVersionQuery,
} from './queries';

@Injectable()
export class VersionService {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly cache: CacheService,
	) {}

	@Span(FoodfolioTopics.VERSION)
	async getFoodfolioServiceVersion() {
		return await this.queryBus.execute(new FoodfolioVersionQuery());
	}

	@Span(WarhammerTopics.VERSION)
	async getWarhammerServiceVersion() {
		return await this.queryBus.execute(new WarhammerVersionQuery());
	}

	@Span(WarcraftTopics.VERSION)
	async getWarcraftServiceVersion() {
		return await this.queryBus.execute(new WarcraftVersionQuery());
	}

	@Span(AzkabanTopics.VERSION)
	async getAzkabanServiceVersion() {
		return await this.queryBus.execute(new AzkabanVersionQuery());
	}

	@Span('dementor.version')
	async getDementorServiceVersion() {
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
				return 'Service is currently unavailable';
			},
		);
		const dementorVersion = await this.getDementorServiceVersion().catch(
			() => {
				return 'Service is currently unavailable';
			},
		);
		const warcraftVersion = await this.getWarcraftServiceVersion().catch(
			() => {
				return 'Service is currently unavailable';
			},
		);
		const warhammerVersion = await this.getWarhammerServiceVersion().catch(
			() => {
				return 'Service is currently unavailable';
			},
		);
		const foodfolioVersion = await this.getFoodfolioServiceVersion().catch(
			() => {
				return 'Service is currently unavailable';
			},
		);
		const versions = {
			dementor: dementorVersion,
			azkaban: {
				alerts: azkabanVersion,
				groups: 'Service is currently unavailable',
				users: azkabanVersion,
				auth: azkabanVersion,
			},
			sse: 'Service is currently unavailable',
			warcraft: {
				api: warcraftVersion,
				characters: warcraftVersion,
				guilds: warcraftVersion,
				cronjobs: {
					assets: warcraftVersion,
					character: warcraftVersion,
					guild: 'Service is currently unavailable',
					mythic: warcraftVersion,
					raid: 'Service is currently unavailable',
				},
			},
			warhammer: {
				characters: warhammerVersion,
				origins: 'Service is currently unavailable',
				fractions: 'Service is currently unavailable',
				roles: 'Service is currently unavailable',
				equipmenmt: 'Service is currently unavailable',
				skills: 'Service is currently unavailable',
				talents: 'Service is currently unavailable',
			},
			foodfolio: {
				category: foodfolioVersion,
				company: 'Service is currently unavailable',
				item: 'Service is currently unavailable',
				item_detail: 'Service is currently unavailable',
				item_variant: 'Service is currently unavailable',
				location: 'Service is currently unavailable',
				shopping_list: 'Service is currently unavailable',
				size: 'Service is currently unavailable',
				type: 'Service is currently unavailable',
				warehouse: 'Service is currently unavailable',
			},
		};
		await this.cache.setKey(cacheKey, versions);
		return versions;
	}

	async getVersions() {
		return await this.checkForCache();
	}
}
