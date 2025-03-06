import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateQuery } from './create.query';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService } from '@azkaban/shared';

@QueryHandler(CreateQuery)
export class CreateQueryHandler implements IQueryHandler<CreateQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: CreateQuery) {
		const topic = AzkabanUserTopics.CREATE;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, {
					email: query.email,
					username: query.username,
					password: query.password,
				})
				.toPromise();
		});
		return circuit.execute().catch((error) => {
			throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
		});
	}

	async execute(query: CreateQuery) {
		return await this.createCircuitBreaker(query);
	}
}
