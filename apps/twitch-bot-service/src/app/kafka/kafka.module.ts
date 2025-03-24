import { Module } from '@nestjs/common';
import {
	KafkaModule as BaseModule,
	AzkabanSSETopicArray,
	TwitchViewerTopicArray,
	TwitchMessageTopicArray,
	TwitchApiTopicArray,
	TwitchChannelTopicArray,
	TwitchStreamTopicArray,
} from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [
		BaseModule.forRoot(
			true,
			{
				clientId: 'twitch-bot',
				groupId: 'twitch-bot-consumer',
				brokerHost: AppConfig.broker.brokerHost,
				brokerPort: AppConfig.broker.brokerPort,
				brokerUsername: AppConfig.broker.brokerUsername,
				brokerPassword: AppConfig.broker.brokerPassword,
			},
			[
				...AzkabanSSETopicArray,
				...TwitchApiTopicArray,
				...TwitchChannelTopicArray,
				...TwitchMessageTopicArray,
				...TwitchStreamTopicArray,
				...TwitchViewerTopicArray,
			],
		),
	],
})
export class KafkaModule {}
