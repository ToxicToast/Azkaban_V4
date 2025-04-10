import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommand } from './delete.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(DeleteCommand)
export class DeleteCommandHandler implements ICommandHandler<DeleteCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: DeleteCommand) {
		const topic = WarcraftCharacterTopics.DELETE;
		return createCircuitBreaker<DeleteCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: DeleteCommand) {
		Logger.log(DeleteCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
