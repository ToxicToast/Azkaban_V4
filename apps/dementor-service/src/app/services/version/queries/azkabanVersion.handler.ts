import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AzkabanVersionQuery } from './azkabanVersion.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	AzkabanTopics,
} from '@azkaban/shared';

@QueryHandler(AzkabanVersionQuery)
export class AzkabanVersionHandler
	implements IQueryHandler<AzkabanVersionQuery>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: AzkabanVersionQuery) {
		const topic = AzkabanTopics.VERSION;
		return createCircuitBreaker<AzkabanVersionQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: AzkabanVersionQuery) {
		const cacheKey = 'version:azkaban';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: AzkabanVersionQuery) {
		Logger.log(AzkabanVersionHandler.name, query);
		return await this.checkForCache(query);
	}
}
