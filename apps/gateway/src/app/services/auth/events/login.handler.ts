import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoginEvent } from './login.event';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(LoginEvent)
export class LoginEventHandler implements IEventHandler<LoginEvent> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	handle(event: LoginEvent): void {
		console.error('LoginEventHandler', event);
	}
}
