import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForgetPasswordCommand } from './forgetpassword.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordCommandHandler
	implements ICommandHandler<ForgetPasswordCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: ForgetPasswordCommand) {
		const topic = AzkabanAuthTopics.FORGET_PASSWORD;
		return createCircuitBreaker<ForgetPasswordCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: ForgetPasswordCommand) {
		return await this.createCircuitBreaker(command);
	}
}
