import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListQuery } from './list.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	Optional,
	WarcraftGuildTopics,
} from '@azkaban/shared';

@QueryHandler(ListQuery)
export class ListQueryHandler implements IQueryHandler<ListQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(
		limit?: Optional<number>,
		offset?: Optional<number>,
	) {
		const topic = WarcraftGuildTopics.LIST;
		return createCircuitBreaker<ListQuery>(
			{
				limit,
				offset,
			},
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(
		limit?: Optional<number>,
		offset?: Optional<number>,
	) {
		let cacheKey = 'warcraft:guilds:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(limit, offset);
	}

	async execute(query: ListQuery) {
		Logger.log(ListQueryHandler.name, query);
		return await this.checkForCache(query.limit, query.offset);
	}
}
