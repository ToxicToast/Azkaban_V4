import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@QueryHandler(IdQuery)
export class IdQueryHandler implements IQueryHandler<IdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
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

	async execute(query: IdQuery) {
		Logger.log(IdQueryHandler.name, query);
		return await this.createCircuitBreaker(query);
	}
}
