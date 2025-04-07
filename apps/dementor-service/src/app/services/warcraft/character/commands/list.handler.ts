import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ListCommand } from './list.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CacheService,
	CircuitService,
	createCircuitBreaker,
	Optional,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(ListCommand)
export class ListCommandHandler implements ICommandHandler<ListCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private async createCircuitBreaker(
		limit?: Optional<number>,
		offset?: Optional<number>,
	) {
		const topic = WarcraftCharacterTopics.LIST;
		return createCircuitBreaker<ListCommand>(
			{
				limit,
				offset,
			},
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(
		limit?: Optional<number>,
		offset?: Optional<number>,
	) {
		let cacheKey = 'warcraft:characters:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(limit, offset);
	}

	async execute(command: ListCommand) {
		Logger.log(ListCommandHandler.name, command);
		return await this.checkForCache(command.limit, command.offset);
	}
}
