import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GuildIdQuery } from './guildId.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftGuildTopics,
} from '@azkaban/shared';

@QueryHandler(GuildIdQuery)
export class GuildIdHandler implements IQueryHandler<GuildIdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
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

	async execute(query: GuildIdQuery) {
		Logger.log(GuildIdHandler.name, query);
		return await this.createCircuitBreaker(query);
	}
}
