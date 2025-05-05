import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommand } from './update.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	CircuitService,
	createCircuitBreaker,
	WarcraftCharacterTopics,
} from '@azkaban/shared';

@CommandHandler(UpdateCommand)
export class UpdateCommandHandler implements ICommandHandler<UpdateCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: UpdateCommand) {
		const topic = WarcraftCharacterTopics.UPDATE;
		return createCircuitBreaker<UpdateCommand>(
			command,
			topic,
			this.circuit,
			this.client,
		);
	}

	async execute(command: UpdateCommand) {
		Logger.log(UpdateCommandHandler.name, command);
		return await this.createCircuitBreaker(command);
	}
}
