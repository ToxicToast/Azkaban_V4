import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
	implements ICommandHandler<RegisterCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: RegisterCommand) {
		const topic = AzkabanAuthTopics.REGISTER;
		return createCircuitBreaker<RegisterCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: RegisterCommand) {
		Logger.log(RegisterCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
