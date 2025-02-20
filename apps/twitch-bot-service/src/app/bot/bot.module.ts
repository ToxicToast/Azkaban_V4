import { Module } from '@nestjs/common';
import { AppConfig } from '../../config';

@Module({
	controllers: [],
	providers: [
		{
			provide: 'TWITCH_USER_ID',
			useValue: AppConfig.twitch.userId,
		},
		{
			provide: 'TWITCH_CLIENT_ID',
			useValue: AppConfig.twitch.clientId,
		},
		{
			provide: 'TWITCH_CLIENT_SECRET',
			useValue: AppConfig.twitch.clientSecret,
		},
		{
			provide: 'TWITCH_ACCESS_TOKEN',
			useValue: AppConfig.twitch.accessToken,
		},
		{
			provide: 'TWITCH_REFRESH_TOKEN',
			useValue: AppConfig.twitch.refreshToken,
		},
		{
			provide: 'TWITCH_CHANNELS',
			useValue: AppConfig.twitch.channels,
		},
	],
})
export class BotModule {}
