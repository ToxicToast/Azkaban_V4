import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WarcraftVersionQuery } from './warcraftVersion.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftTopics,
} from '@azkaban/shared';

@QueryHandler(WarcraftVersionQuery)
export class WarcraftVersionHandler
	implements IQueryHandler<WarcraftVersionQuery>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: WarcraftVersionQuery) {
		const topic = WarcraftTopics.VERSION;
		return createCircuitBreaker<WarcraftVersionQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: WarcraftVersionQuery) {
		const cacheKey = 'warcraft:version';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: WarcraftVersionQuery) {
		Logger.log(WarcraftVersionHandler.name, query);
		return await this.checkForCache(query);
	}
}
