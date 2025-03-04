import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { HttpException, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService, Response } from '@azkaban/shared';
import { UserDAO } from '@azkaban/user-infrastructure';

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
		return circuit.execute();
	}

	async execute(query: IdQuery) {
		return await this.createCircuitBreaker(query)
			.then((res: Response<UserDAO>) => {
				if (res.error !== null) {
					throw new HttpException(res.error, res.errorCode ?? 500);
				}
				return res.data;
			})
			.catch((err) => {
				Logger.error(err.message, err.stack, 'IdQueryHandler');
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
