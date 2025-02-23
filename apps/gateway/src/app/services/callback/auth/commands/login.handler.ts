import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanSSETopics, CircuitService } from '@azkaban/shared';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: LoginCommand) {
		const { dto } = command;
		const topic = AzkabanSSETopics.LOGIN;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			await this.client
				.emit(topic, { id: dto.user?.id, username: dto.user?.nickname })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: LoginCommand) {
		return await this.createCircuitBreaker(command).catch((err) => {
			throw new HttpException(err.message, err.status ?? 503);
		});
	}
}
