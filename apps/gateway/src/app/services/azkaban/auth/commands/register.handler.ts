import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
	PasswordHash,
} from '@azkaban/shared';
import { AppConfig } from '../../../../../config';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
	implements ICommandHandler<RegisterCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: RegisterCommand) {
		const hashedPassword = await PasswordHash(
			command.password,
			AppConfig.jwt,
		);
		const data = {
			...command,
			password: hashedPassword,
		};
		const topic = AzkabanAuthTopics.REGISTER;
		return createCircuitBreaker<RegisterCommand>(
			data,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: RegisterCommand) {
		return await this.createCircuitBreaker(command);
	}
}
