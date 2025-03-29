import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CacheCommand } from './cache.command';
import { CacheService } from '@azkaban/shared';
import { Logger } from '@nestjs/common';

@CommandHandler(CacheCommand)
export class CacheCommandHandler implements ICommandHandler<CacheCommand> {
	constructor(private readonly cache: CacheService) {}

	async execute(command: CacheCommand) {
		Logger.debug({ command }, CacheCommandHandler.name);
		await this.cache.setKey(command.type, command.data);
	}
}
