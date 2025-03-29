import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ListCommand } from './list.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(ListCommand)
export class ListCommandHandler implements ICommandHandler<ListCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker() {
		const topic = WarcraftCharacterTopics.LIST;
		return createCircuitBreaker<ListCommand>(
			{},
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache() {
		const cacheKey = 'warcraft:characters:list';
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker();
	}

	async execute() {
		Logger.debug({}, ListCommandHandler.name);
		return await this.checkForCache();
	}
}
