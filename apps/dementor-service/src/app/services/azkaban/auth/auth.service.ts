import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { AzkabanAuthTopics } from '@azkaban/shared';
import { LoginCommand, RegisterCommand } from './commands';
import { JwtService } from '@nestjs/jwt';
import { AuthPresenter } from './auth.presenter';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly eventBus: EventBus,
		private readonly jwt: JwtService,
	) {}

	@UseGuards(AuthGuard('local'))
	@Span(AzkabanAuthTopics.LOGIN + '.dementor')
	async login(data: { username: string; password: string }) {
		const user = await this.commandBus.execute(new LoginCommand(data));
		const presenter = new AuthPresenter(user);
		const userPresenter = presenter.transform();
		return {
			access_token: this.jwt.sign(userPresenter),
			user: userPresenter,
		};
	}

	@Span(AzkabanAuthTopics.REGISTER + '.dementor')
	async register(data: {
		username: string;
		password: string;
		email: string;
	}) {
		Logger.log('Register New User', { data });
		return await this.commandBus.execute(new RegisterCommand(data));
	}
}
