import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GuildQuery } from './guild.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(GuildQuery)
export class GuildQueryHandler implements IQueryHandler<GuildQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
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

	async execute(query: GuildQuery) {
		Logger.log(GuildQueryHandler.name, query);
		return await this.createCircuitBreaker(query);
	}
}
