import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CircuitService,
	createCircuitBreaker,
	PasswordHash,
} from '@azkaban/shared';
import { LoginDAO } from '../dao';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly jwtService: JwtService,
	) {}

	private createCircuitBreaker(command: LoginCommand) {
		const data = {
			...command,
			password: PasswordHash(command.password),
		};
		const topic = AzkabanAuthTopics.LOGIN;
		return createCircuitBreaker<LoginCommand>(
			data,
			topic,
			this.circuit,
			this.client,
		).then((response: LoginDAO) => {
			return this.createToken(response);
		});
	}

	private async createToken(data: LoginDAO): Promise<string> {
		Logger.debug('Creating token for user: ' + data.user.username);
		const payload = {
			sub: data.user.id,
			user: data.user,
			groups: data.groups,
		};
		return await this.jwtService.signAsync(payload);
	}

	async execute(command: LoginCommand) {
		return await this.createCircuitBreaker(command);
	}
}
