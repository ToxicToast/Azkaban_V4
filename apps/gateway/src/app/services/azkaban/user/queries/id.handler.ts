import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import {
	HttpException,
	Inject,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService, Nullable } from '@azkaban/shared';
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
			.then((res: Nullable<UserDAO>) => {
				if (res !== null) {
					return res;
				}
				throw new NotFoundException('User not found');
			})
			.catch((err) => {
				Logger.error(err.message, err.stack, 'IdQueryHandler');
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
