import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { BotModule } from './bot/bot.module';
import { ViewerModule } from './viewer/viewer.module';
import { MessageModule } from './message/message.module';
import { StreamModule } from './stream/stream.module';
import { ChannelModule } from './channel/channel.module';

@Module({
	imports: [
		ApiModule,
		BotModule,
		ViewerModule,
		MessageModule,
		StreamModule,
		ChannelModule,
	],
})
export class TwitchModule {}
