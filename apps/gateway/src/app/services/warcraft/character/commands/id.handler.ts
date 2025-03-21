import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IdCommand } from './id.command';
import { Inject } from '@nestjs/common';
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
		const cacheKey = 'warcraft:character:' + command.id;
		const hasCache = await this.cache.inCache(cacheKey);
		if (hasCache) {
			return await this.cache.getKey(cacheKey);
		}
		return await this.createCircuitBreaker(command);
	}

	async execute(command: IdCommand) {
		return await this.checkForCache(command);
	}
}
