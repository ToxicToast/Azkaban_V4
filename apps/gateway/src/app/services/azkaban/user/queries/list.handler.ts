import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListQuery } from './list.query';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService } from '@azkaban/shared';

@QueryHandler(ListQuery)
export class ListQueryHandler implements IQueryHandler<ListQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker() {
		const topic = AzkabanUserTopics.LIST;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client.send(topic, {}).toPromise();
		});
		return circuit.execute().catch((error) => {
			throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
		});
	}

	async execute() {
		return await this.createCircuitBreaker();
	}
}
