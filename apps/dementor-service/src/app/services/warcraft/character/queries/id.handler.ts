import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(IdQuery)
export class IdQueryHandler implements IQueryHandler<IdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: IdQuery) {
		const topic = WarcraftCharacterTopics.ID;
		return createCircuitBreaker<IdQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: IdQuery) {
		const cacheKey = 'warcraft:characters:id:' + query.id;
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: IdQuery) {
		Logger.log(IdQueryHandler.name, query);
		return await this.checkForCache(query);
	}
}
