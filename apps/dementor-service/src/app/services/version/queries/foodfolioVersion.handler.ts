import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FoodfolioVersionQuery } from './foodfolioVersion.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	FoodfolioTopics,
} from '@azkaban/shared';

@QueryHandler(FoodfolioVersionQuery)
export class FoodfolioVersionHandler
	implements IQueryHandler<FoodfolioVersionQuery>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: FoodfolioVersionQuery) {
		const topic = FoodfolioTopics.VERSION;
		return createCircuitBreaker<FoodfolioVersionQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: FoodfolioVersionQuery) {
		const cacheKey = 'version:foodfolio';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: FoodfolioVersionQuery) {
		Logger.log(FoodfolioVersionHandler.name, query);
		return await this.checkForCache(query);
	}
}
