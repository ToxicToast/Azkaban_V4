import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: CreateCommand) {
		const topic = WarcraftCharacterTopics.CREATE;
		return createCircuitBreaker<CreateCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: CreateCommand) {
		Logger.log(CreateCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
