import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
	PasswordHash,
} from '@azkaban/shared';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: LoginCommand) {
		const data = {
			...command,
			password: PasswordHash(command.password),
		};
		const topic = AzkabanAuthTopics.LOGIN;
		return createCircuitBreaker<LoginCommand>(
			data,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: LoginCommand) {
		return await this.createCircuitBreaker(command);
	}
}
