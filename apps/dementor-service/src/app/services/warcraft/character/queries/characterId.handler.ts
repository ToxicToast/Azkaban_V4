import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CharacterIdQuery } from './characterId.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(CharacterIdQuery)
export class CharacterIdHandler implements IQueryHandler<CharacterIdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: CharacterIdQuery) {
		const topic = WarcraftCharacterTopics.CHARACTERID;
		return createCircuitBreaker<CharacterIdQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: CharacterIdQuery) {
		const cacheKey =
			'warcraft:characters:characterid:' + query.character_id;
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: CharacterIdQuery) {
		Logger.log(CharacterIdHandler.name, query);
		return await this.checkForCache(query);
	}
}
