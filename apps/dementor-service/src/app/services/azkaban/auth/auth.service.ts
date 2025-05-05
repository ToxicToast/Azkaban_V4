import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { AzkabanAuthTopics } from '@azkaban/shared';
import { LoginCommand } from './commands';

@Injectable()
export class AuthService {
	constructor(private readonly commandBus: CommandBus) {}

	@Span(AzkabanAuthTopics.LOGIN + '.dementor')
	async login(data: { username: string; password: string }) {
		Logger.log('Login User', { data });
		const user = await this.commandBus.execute(new LoginCommand(data));
		Logger.log('User Logged In', { user });
		return user;
	}
}
