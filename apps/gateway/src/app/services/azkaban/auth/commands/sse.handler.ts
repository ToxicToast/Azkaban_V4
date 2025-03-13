import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SSECommand } from './sse.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CircuitService, createCircuitBreaker } from '@azkaban/shared';

@CommandHandler(SSECommand)
export class SSECommandHandler implements ICommandHandler<SSECommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private async createCircuitBreaker(command: SSECommand) {
		return createCircuitBreaker<SSECommand>(
			command,
			command.type,
			this.circuit,
			this.client,
		);
	}

	async execute(command: SSECommand) {
		return await this.createCircuitBreaker(command);
	}
}
