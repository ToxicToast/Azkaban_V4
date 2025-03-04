import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateQuery } from './create.query';
import { HttpException, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService } from '@azkaban/shared';
import { UserDAO } from '@azkaban/user-infrastructure';

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
		return circuit.execute();
	}

	async execute(query: CreateQuery) {
		return await this.createCircuitBreaker(query)
			.then((res: Array<UserDAO>) => {
				Logger.debug('CreateQueryHandler', res);
				return res;
			})
			.catch((err) => {
				Logger.error(err.message, err.stack, 'CreateQueryHandler');
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
