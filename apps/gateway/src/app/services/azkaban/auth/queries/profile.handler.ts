import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileQuery } from './profile.query';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@QueryHandler(ProfileQuery)
export class ProfileQueryHandler implements IQueryHandler<ProfileQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: ProfileQuery) {
		const topic = AzkabanAuthTopics.PROFILE;
		return createCircuitBreaker<ProfileQuery>(
			query,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(query: ProfileQuery) {
		return await this.createCircuitBreaker(query);
	}
}
