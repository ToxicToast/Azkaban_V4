import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanAuthTopics, CircuitService } from '@azkaban/shared';
import { RegisterDAO } from '../dao';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
	implements ICommandHandler<RegisterCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: RegisterCommand) {
		const { email, username, password } = command;
		const topic = AzkabanAuthTopics.REGISTER;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, { email, username, password })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: RegisterCommand) {
		return await this.createCircuitBreaker(command)
			.then((res: RegisterDAO) => {
				return res;
			})
			.catch((err) => {
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
