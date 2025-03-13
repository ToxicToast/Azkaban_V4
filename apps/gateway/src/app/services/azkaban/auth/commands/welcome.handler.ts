import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanEmailTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';
import { WelcomeCommand } from './welcome.command';

@CommandHandler(WelcomeCommand)
export class WelcomeCommandHandler implements ICommandHandler<WelcomeCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: WelcomeCommand) {
		const topic = AzkabanEmailTopics.WELCOME;
		return createCircuitBreaker<WelcomeCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: WelcomeCommand) {
		return await this.createCircuitBreaker(command);
	}
}
