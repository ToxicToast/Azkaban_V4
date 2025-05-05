import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserIdQuery } from './userid.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	AzkabanUserTopics,
} from '@azkaban/shared';

@QueryHandler(UserIdQuery)
export class UserIdHandler implements IQueryHandler<UserIdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: UserIdQuery) {
		const topic = AzkabanUserTopics.USERID;
		return createCircuitBreaker<UserIdQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: UserIdQuery) {
		const cacheKey = 'azkaban:users:userid:' + query.user_id;
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: UserIdQuery) {
		Logger.log(UserIdHandler.name, query);
		return await this.checkForCache(query);
	}
}
