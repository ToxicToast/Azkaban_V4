import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanAuthTopics, CircuitService } from '@azkaban/shared';
import { LoginDAO } from '../dao';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: LoginCommand) {
		const { email, password } = command;
		const topic = AzkabanAuthTopics.LOGIN;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, { email, password })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: LoginCommand) {
		return await this.createCircuitBreaker(command)
			.then((res: LoginDAO) => {
				return res;
			})
			.catch((err) => {
				throw new HttpException(err.message, err.status ?? 503);
			});
	}
}
