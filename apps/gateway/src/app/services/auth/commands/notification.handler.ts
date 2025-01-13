import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotificationCommand } from './notification.command';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { NotificationTopics } from '@azkaban/shared';

@CommandHandler(NotificationCommand)
export class NotificationCommandHandler
	implements ICommandHandler<NotificationCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	private async onRegister(id: string, username: string) {
		const topic = NotificationTopics.REGISTER;
		await this.client.emit(topic, { id, username }).toPromise();
	}

	private async onLogin(id: string, username: string) {
		const topic = NotificationTopics.LOGIN;
		await this.client.emit(topic, { id, username }).toPromise();
	}

	async execute(command: NotificationCommand) {
		const { type, id, username } = command;
		switch (type) {
			case 'login':
				await this.onLogin(id, username);
				break;
			case 'register':
				await this.onRegister(id, username);
				break;
		}
	}
}
