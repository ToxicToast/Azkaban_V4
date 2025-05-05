import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivateCommand } from './activate.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(ActivateCommand)
export class ActivateCommandHandler
	implements ICommandHandler<ActivateCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: ActivateCommand) {
		const topic = WarcraftCharacterTopics.ACTIVATE;
		return createCircuitBreaker<ActivateCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: ActivateCommand) {
		Logger.log(ActivateCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
