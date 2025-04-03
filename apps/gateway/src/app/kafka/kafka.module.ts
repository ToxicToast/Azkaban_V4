import { Module } from '@nestjs/common';
import {
	KafkaModule as BaseModule,
	WarcraftApiTopicArray,
	WarcraftAuditTopicArray,
	WarcraftCharacterTopicArray,
	WarcraftGuildTopicArray,
	WarcraftRaiderTopicArray,
	WarcraftTopicArray,
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
				// Azkaban Services
				// Blog Services
				// Coworking Services
				// Discord Services
				// Foodfolio Services
				// Twitch Services
				// Warcraft Services
				...WarcraftApiTopicArray,
				...WarcraftCharacterTopicArray,
				...WarcraftRaiderTopicArray,
				...WarcraftAuditTopicArray,
				...WarcraftGuildTopicArray,
				// Versioning
				...WarcraftTopicArray,
			],
		),
	],
})
export class KafkaModule {}
