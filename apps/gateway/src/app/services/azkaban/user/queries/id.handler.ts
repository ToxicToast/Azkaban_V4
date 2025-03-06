import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService } from '@azkaban/shared';

@QueryHandler(IdQuery)
export class IdQueryHandler implements IQueryHandler<IdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: IdQuery) {
		const topic = AzkabanUserTopics.ID;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, {
					id: query.id,
				})
				.toPromise();
		});
		return circuit.execute().catch((error) => {
			throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
		});
	}

	async execute(query: IdQuery) {
		return await this.createCircuitBreaker(query);
	}
}
