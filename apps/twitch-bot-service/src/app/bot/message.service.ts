import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import { Events, MessageData } from '@toxictoast/azkaban-twitch-bot-events';
import { BotService } from './bot.service';
import { ClientKafka } from '@nestjs/microservices';
import { TwitchMessageTopics } from '@azkaban/shared';

@Injectable()
export class MessageService {
	private readonly toasty: Bot;
	private readonly events: Array<Events> = [Events.MESSAGE];

	constructor(
		private readonly botService: BotService,
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {
		this.toasty = this.botService.instance();
	}

	private async eventMessage(data: MessageData): Promise<void> {
		await this.client
			.emit(TwitchMessageTopics.MESSAGE, {
				channel: data.channel,
				username: data.username,
				message: data.message,
				message_id: data.args.id,
			})
			.toPromise();
	}

	private onEventMessages(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Message-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				if (eventName === Events.MESSAGE) {
					await this.eventMessage(data as MessageData);
				}
			},
		});
	}

	initEvents(): void {
		this.events.forEach((event: Events) => {
			this.onEventMessages(event);
		});
	}
}
