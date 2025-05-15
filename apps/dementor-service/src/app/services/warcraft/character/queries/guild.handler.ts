import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GuildQuery } from './guild.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(GuildQuery)
export class GuildQueryHandler implements IQueryHandler<GuildQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: GuildQuery) {
		const topic = WarcraftCharacterTopics.GUILD;
		return createCircuitBreaker<GuildQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: GuildQuery) {
		let cacheKey = 'warcraft:characters:guild:' + query.guild;
		if (query.withDeleted !== undefined) {
			cacheKey += ':withDeleted:' + String(query.withDeleted);
		}
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: GuildQuery) {
		Logger.log(GuildQueryHandler.name, query);
		return await this.checkForCache(query);
	}
}
