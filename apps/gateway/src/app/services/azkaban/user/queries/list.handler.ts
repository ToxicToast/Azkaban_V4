import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListQuery } from './list.query';
import { HttpException, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService, Response } from '@azkaban/shared';
import { UserDAO } from '@azkaban/user-infrastructure';

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
		return circuit.execute();
	}

	async execute() {
		return await this.createCircuitBreaker()
			.then((res: Response<Array<UserDAO>>) => {
				if (res.error !== null) {
					throw new HttpException(res.error, res.errorCode ?? 500);
				}
				return res.data;
			})
			.catch((err) => {
				Logger.error(err.message, err.stack, 'ListQueryHandler');
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
