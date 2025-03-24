import { Module } from '@nestjs/common';
import {
	KafkaModule as BaseModule,
	WarcraftCharacterTopicArray,
	WarcraftApiTopicArray,
	WarcraftGuildTopicArray,
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
				...WarcraftCharacterTopicArray,
				...WarcraftApiTopicArray,
				...WarcraftGuildTopicArray,
			],
		),
	],
})
export class KafkaModule {}
