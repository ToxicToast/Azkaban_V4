import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeactivateCommand } from './deactivate.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftGuildTopics,
} from '@azkaban/shared';

@CommandHandler(DeactivateCommand)
export class DeactivateCommandHandler
	implements ICommandHandler<DeactivateCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: DeactivateCommand) {
		const topic = WarcraftGuildTopics.DEACTIVATE;
		return createCircuitBreaker<DeactivateCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: DeactivateCommand) {
		Logger.log(DeactivateCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
