import { Inject, Injectable } from '@nestjs/common';
import { Bot } from '@toxictoast/azkaban-twitch-bot';

@Injectable()
export class BotService {
	private readonly toasty: Bot;

	constructor(
		@Inject('TWITCH_USER_ID') private readonly userId: string,
		@Inject('TWITCH_CLIENT_ID') private readonly clientId: string,
		@Inject('TWITCH_CLIENT_SECRET') private readonly clientSecret: string,
		@Inject('TWITCH_ACCESS_TOKEN') private readonly accessToken: string,
		@Inject('TWITCH_REFRESH_TOKEN') private readonly refreshToken: string,
		@Inject('TWITCH_CHANNELS') private readonly channels: Array<string>,
		@Inject('TWITCH_LOGGING') private readonly logging: boolean,
	) {
		this.toasty = new Bot({
			logging: this.logging,
			authentication: {
				userId: this.userId,
				clientId: this.clientId,
				clientSecret: this.clientSecret,
				accessToken: this.accessToken,
				refreshToken: this.refreshToken,
			},
			channels: this.channels,
		});
	}

	instance(): Bot {
		return this.toasty;
	}

	startBot(): void {
		this.toasty.initBot();
	}

	stopBot(): void {
		this.toasty.stopBot();
	}
}
