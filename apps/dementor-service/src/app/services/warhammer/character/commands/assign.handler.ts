import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignCommand } from './assign.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarhammerCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(AssignCommand)
export class AssignCommandHandler implements ICommandHandler<AssignCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: AssignCommand) {
		const topic = WarhammerCharacterTopics.ASSIGN;
		return createCircuitBreaker<AssignCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: AssignCommand) {
		Logger.log(AssignCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
