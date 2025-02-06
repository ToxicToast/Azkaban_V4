import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileQuery } from './profile.query';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanAuthTopics, CircuitService } from '@azkaban/shared';

@QueryHandler(ProfileQuery)
export class ProfileQueryHandler implements IQueryHandler<ProfileQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: ProfileQuery) {
		const { token } = query;
		const topic = AzkabanAuthTopics.PROFILE;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client.send(topic, { token }).toPromise();
		});
		return circuit.execute();
	}

	async execute(query: ProfileQuery) {
		return await this.createCircuitBreaker(query)
			.then((res: unknown) => {
				return res;
			})
			.catch((err) => {
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
