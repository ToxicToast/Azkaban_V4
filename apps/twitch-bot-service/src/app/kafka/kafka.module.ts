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
				clientId: AppConfig.name,
				groupId: AppConfig.name + '-consumer',
				brokerHost: AppConfig.broker.brokerHost,
				brokerPort: AppConfig.broker.brokerPort,
				brokerUsername: AppConfig.broker.brokerUsername,
				brokerPassword: AppConfig.broker.brokerPassword,
				withSasl: AppConfig.environment !== 'local',
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
