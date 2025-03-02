import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';
import {
	BanData,
	Events,
	JoinData,
	MessageData,
	PartData,
	TimeoutData,
} from '@toxictoast/azkaban-twitch-bot-events';
import { BotService } from './bot.service';
import { ClientKafka } from '@nestjs/microservices';
import { TwitchViewerTopics } from '@azkaban/shared';

@Injectable()
export class ViewerService {
	private readonly toasty: Bot;
	private readonly events: Array<Events> = [
		Events.JOIN,
		Events.PART,
		Events.TIMEOUT,
		Events.BAN,
		Events.MESSAGE,
	];

	constructor(
		private readonly botService: BotService,
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {
		this.toasty = this.botService.instance();
	}

	private async eventViewerJoin(data: JoinData): Promise<void> {
		await this.client
			.emit(TwitchViewerTopics.JOIN, {
				channel: data.channel,
				username: data.username,
			})
			.toPromise();
	}

	private async eventViewerPart(data: PartData): Promise<void> {
		await this.client
			.emit(TwitchViewerTopics.PART, {
				channel: data.channel,
				username: data.username,
			})
			.toPromise();
	}

	private async eventViewerTimeout(data: TimeoutData): Promise<void> {
		await this.client
			.emit(TwitchViewerTopics.TIMEOUT, {
				channel: data.channel,
				username: data.username,
				duration: data.duration,
			})
			.toPromise();
	}

	private async eventViewerBan(data: BanData): Promise<void> {
		await this.client
			.emit(TwitchViewerTopics.BAN, {
				channel: data.channel,
				username: data.username,
			})
			.toPromise();
	}

	private async eventViewerMessage(data: MessageData): Promise<void> {
		await this.client
			.emit(TwitchViewerTopics.MESSAGE, {
				channel: data.channel,
				username: data.username,
			})
			.toPromise();
	}

	private onEventViewers(eventName: Events): void {
		this.toasty.addPlugin({
			name: `Viewer-${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`,
			event: eventName,
			execute: async (data: unknown) => {
				if (eventName === Events.JOIN) {
					await this.eventViewerJoin(data as JoinData);
				}
				if (eventName === Events.PART) {
					await this.eventViewerPart(data as PartData);
				}
				if (eventName === Events.TIMEOUT) {
					await this.eventViewerTimeout(data as TimeoutData);
				}
				if (eventName === Events.BAN) {
					await this.eventViewerBan(data as BanData);
				}
				if (eventName === Events.MESSAGE) {
					await this.eventViewerMessage(data as MessageData);
				}
			},
		});
	}

	initEvents(): void {
		this.events.forEach((event: Events) => {
			this.onEventViewers(event);
		});
	}
}
