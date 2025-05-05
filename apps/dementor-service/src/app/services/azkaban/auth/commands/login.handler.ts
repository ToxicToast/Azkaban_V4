import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: LoginCommand) {
		const topic = AzkabanAuthTopics.LOGIN;
		return createCircuitBreaker<LoginCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: LoginCommand) {
		Logger.log(LoginCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
