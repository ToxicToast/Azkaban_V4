import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GuildIdQuery } from './guildId.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftGuildTopics,
} from '@azkaban/shared';

@QueryHandler(GuildIdQuery)
export class GuildIdHandler implements IQueryHandler<GuildIdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(query: GuildIdQuery) {
		const topic = WarcraftGuildTopics.GUILDID;
		return createCircuitBreaker<GuildIdQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(query: GuildIdQuery) {
		let cacheKey = 'warcraft:guilds:guildid:' + query.guild_id;
		if (query.withDeleted !== undefined) {
			cacheKey += ':withDeleted:' + String(query.withDeleted);
		}
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(query);
	}

	async execute(query: GuildIdQuery) {
		Logger.log(GuildIdHandler.name, query);
		return await this.checkForCache(query);
	}
}
