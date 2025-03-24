import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { IdCommand } from './id.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanUserTopics,
	CacheService,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@CommandHandler(IdCommand)
export class IdCommandHandler implements ICommandHandler<IdCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly cache: CacheService,
	) {}

	private createCircuitBreaker(command: IdCommand) {
		const topic = AzkabanUserTopics.ID;
		return createCircuitBreaker<IdCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	private async checkForCache(command: IdCommand) {
		const cacheKey = 'azkaban:user:' + command.id;
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(command);
	}

	async execute(command: IdCommand) {
		Logger.debug({ command }, IdCommandHandler.name);
		return await this.checkForCache(command);
	}
}
