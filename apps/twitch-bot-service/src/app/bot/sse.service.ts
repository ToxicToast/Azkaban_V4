import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import { Events } from '@toxictoast/azkaban-twitch-bot-events';
import { BotService } from './bot.service';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanSSETopics } from '@azkaban/shared';

@Injectable()
export class SSEService {
	private readonly toasty: Bot;
	private readonly events: Array<Events> = [
		Events.JOIN,
		Events.PART,
		Events.MESSAGE,
		Events.TIMEOUT,
		Events.BAN,
		Events.SUB,
		Events.RESUB,
		Events.SUBGIFT,
		Events.SUBEXTEND,
		Events.COMMUNITYSUB,
	];

	constructor(
		private readonly botService: BotService,
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {
		this.toasty = this.botService.instance();
	}

	private async toSSE(eventName: string, data: object): Promise<void> {
		const payload = {
			service: 'twitch-bot-service',
			event: eventName,
			data,
		};
		await this.client.emit(AzkabanSSETopics.TWITCHBOT, payload).toPromise();
	}

	private registerPlugin(eventName: Events): void {
		this.toasty.addPlugin({
			name: `SSE-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: object) => {
				await this.toSSE(eventName, data);
			},
		});
	}

	initEvents(): void {
		this.events.forEach((event) => {
			this.registerPlugin(event);
		});
	}
}
