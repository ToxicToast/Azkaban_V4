import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CharacterIdQuery } from './characterId.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(CharacterIdQuery)
export class CharacterIdHandler implements IQueryHandler<CharacterIdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
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

	async execute(query: CharacterIdQuery) {
		Logger.log(CharacterIdHandler.name, query);
		return await this.createCircuitBreaker(query);
	}
}
