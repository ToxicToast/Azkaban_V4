import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListQuery } from './list.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(ListQuery)
export class ListQueryHandler implements IQueryHandler<ListQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: ListQuery) {
		const topic = WarcraftCharacterTopics.LIST;
		return createCircuitBreaker<ListQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: ListQuery) {
		let cacheKey = 'warcraft:characters:list';
		if (query.limit !== undefined) {
			cacheKey += `:limit:${query.limit}`;
		}
		if (query.offset !== undefined) {
			cacheKey += `:offset:${query.offset}`;
		}
		if (query.withDeleted !== undefined) {
			cacheKey += ':withDeleted:' + String(query.withDeleted);
		}
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: ListQuery) {
		Logger.log(ListQueryHandler.name, query);
		return await this.checkForCache(query);
	}
}
