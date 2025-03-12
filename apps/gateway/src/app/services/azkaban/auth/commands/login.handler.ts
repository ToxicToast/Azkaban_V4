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
import { AppConfig } from '../../../../../config';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly circuit: CircuitService,
		private readonly jwtService: JwtService,
	) {}

	private async createCircuitBreaker(command: LoginCommand) {
		const hashedPassword = await PasswordHash(
			command.password,
			AppConfig.jwt,
		);
		const data = {
			...command,
			password: hashedPassword,
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

	private createToken(data: LoginDAO): string {
		Logger.debug('Creating token for user: ' + data.user.username);
		const payload = {
			sub: data.user.id,
			user: data.user,
			groups: data.groups,
		};
		return this.jwtService.sign(payload);
	}

	async execute(command: LoginCommand) {
		return await this.createCircuitBreaker(command);
	}
}
