import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ListCommand } from './list.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanUserTopics,
	CacheService,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@CommandHandler(ListCommand)
export class ListCommandHandler implements ICommandHandler<ListCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker() {
		const topic = AzkabanUserTopics.LIST;
		return createCircuitBreaker<ListCommand>(
			{},
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache() {
		const cacheKey = 'azkaban:users:list';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker();
	}

	async execute() {
		return await this.checkForCache();
	}
}
