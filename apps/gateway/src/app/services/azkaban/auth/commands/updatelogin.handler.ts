import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanUserTopics,
	CircuitService,
	createCircuitBreaker,
} from '@azkaban/shared';
import { UpdateLoginCommand } from './updatelogin.command';

@CommandHandler(UpdateLoginCommand)
export class UpdateLoginCommandHandler
	implements ICommandHandler<UpdateLoginCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: UpdateLoginCommand) {
		const topic = AzkabanUserTopics.LOGIN;
		return createCircuitBreaker<UpdateLoginCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: UpdateLoginCommand) {
		Logger.debug({ command }, UpdateLoginCommandHandler.name);
		return await this.createCircuitBreaker(command);
	}
}
