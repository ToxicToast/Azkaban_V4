import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestoreCommand } from './restore.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(RestoreCommand)
export class RestoreCommandHandler implements ICommandHandler<RestoreCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: RestoreCommand) {
		const topic = WarcraftCharacterTopics.RESTORE;
		return createCircuitBreaker<RestoreCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: RestoreCommand) {
		Logger.log(RestoreCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
