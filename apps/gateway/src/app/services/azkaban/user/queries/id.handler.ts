import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdQuery } from './id.query';
import { HttpException, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanUserTopics, CircuitService } from '@azkaban/shared';

@QueryHandler(IdQuery)
export class IdQueryHandler implements IQueryHandler<IdQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker() {
		const topic = AzkabanUserTopics.ID;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client.send(topic, {}).toPromise();
		});
		return circuit.execute();
	}

	async execute() {
		return await this.createCircuitBreaker()
			.then((res: unknown) => {
				Logger.debug('IdQueryHandler', res);
				return res;
			})
			.catch((err) => {
				Logger.error(err.message, err.stack, 'IdQueryHandler');
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
