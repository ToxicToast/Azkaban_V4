import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftGuildTopics,
} from '@azkaban/shared';

@QueryHandler(IdQuery)
export class IdQueryHandler implements IQueryHandler<IdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: IdQuery) {
		const topic = WarcraftGuildTopics.ID;
		return createCircuitBreaker<IdQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: IdQuery) {
		let cacheKey = 'warcraft:guilds:id:' + query.id;
		if (query.withDeleted !== undefined) {
			cacheKey += ':withDeleted:' + String(query.withDeleted);
		}
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
