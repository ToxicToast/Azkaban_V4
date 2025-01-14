import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VersionQuery } from './version.query';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CacheService, CircuitService } from '@azkaban/shared';

@QueryHandler(VersionQuery)
export class VersionQueryHandler implements IQueryHandler<VersionQuery> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly cacheService: CacheService,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(query: VersionQuery) {
		const { topic } = query;
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client.send(topic, {}).toPromise();
		});
		return circuit.execute();
	}

	async execute(query: VersionQuery): Promise<unknown> {
		const { topic } = query;
		const cacheKey = `${topic}`;
		const inCache = await this.cacheService.inCache(cacheKey);
		if (!inCache) {
			const response = await this.createCircuitBreaker(query)
				.then((res) => {
					this.cacheService.setKey(cacheKey, res);
					return res;
				})
				.catch((err) => {
					return err.message;
				});
			return response;
		}
		return await this.cacheService.getKey(cacheKey);
	}
}
