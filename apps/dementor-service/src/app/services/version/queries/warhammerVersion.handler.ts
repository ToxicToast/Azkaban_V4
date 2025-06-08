import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WarhammerVersionQuery } from './warhammerVersion.query';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarhammerTopics,
} from '@azkaban/shared';

@QueryHandler(WarhammerVersionQuery)
export class WarhammerVersionHandler
	implements IQueryHandler<WarhammerVersionQuery>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: WarhammerVersionQuery) {
		const topic = WarhammerTopics.VERSION;
		return createCircuitBreaker<WarhammerVersionQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: WarhammerVersionQuery) {
		const cacheKey = 'version:warhammer';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: WarhammerVersionQuery) {
		return await this.checkForCache(query);
	}
}
