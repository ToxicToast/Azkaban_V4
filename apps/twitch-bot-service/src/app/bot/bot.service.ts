import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
	constructor(
		@Inject('TWITCH_USER_ID') private readonly userId: string,
		@Inject('TWITCH_CLIENT_ID') private readonly clientId: string,
		@Inject('TWITCH_CLIENT_SECRET') private readonly clientSecret: string,
		@Inject('TWITCH_ACCESS_TOKEN') private readonly accessToken: string,
		@Inject('TWITCH_REFRESH_TOKEN') private readonly refreshToken: string,
		@Inject('TWITCH_CHANNELS') private readonly channels: Array<string>,
	) {}
}
