import { Module } from '@nestjs/common';
import {
	AzkabanAuthTopicArray,
	AzkabanEmailTopicArray,
	AzkabanSSETopicArray,
	AzkabanUserTopicArray,
	KafkaModule as BaseModule,
	WarcraftCharacterTopicArray,
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
			},
			[
				// Azkaban Services
				...AzkabanSSETopicArray,
				...AzkabanAuthTopicArray,
				...AzkabanUserTopicArray,
				...AzkabanEmailTopicArray,
				// Blog Services
				// Coworking Services
				// Discord Services
				// Foodfolio Services
				// Twitch Services
				// Warcraft Services
				...WarcraftCharacterTopicArray,
			],
		),
	],
})
export class KafkaModule {}
