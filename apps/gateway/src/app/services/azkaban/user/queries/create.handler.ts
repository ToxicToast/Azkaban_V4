import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateQuery } from './create.query';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanUserTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@QueryHandler(CreateQuery)
export class CreateQueryHandler implements IQueryHandler<CreateQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: CreateQuery) {
		const topic = AzkabanUserTopics.CREATE;
		return createCircuitBreaker<CreateQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(query: CreateQuery) {
		return await this.createCircuitBreaker(query);
	}
}
