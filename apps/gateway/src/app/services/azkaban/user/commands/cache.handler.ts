import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CacheCommand } from './cache.command';
import { CacheService } from '@azkaban/shared';

@CommandHandler(CacheCommand)
export class CacheCommandHandler implements ICommandHandler<CacheCommand> {
	constructor(private readonly cache: CacheService) {}

	async execute(command: CacheCommand) {
		await this.cache.setKey(command.type, command.data);
	}
}
