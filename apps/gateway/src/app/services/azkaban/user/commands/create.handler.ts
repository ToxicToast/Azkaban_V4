import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from './create.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanUserTopics,
	CircuitService,
	createCircuitBreaker,
	PasswordHash,
} from '@azkaban/shared';

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: CreateCommand) {
		const topic = AzkabanUserTopics.CREATE;
		return createCircuitBreaker<CreateCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: CreateCommand) {
		return await this.createCircuitBreaker(command);
	}
}
