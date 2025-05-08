import { Module } from '@nestjs/common';
import {
	AzkabanSSETopicArray,
	AzkabanWebhookTopicArray,
	BullModule,
	CacheModule,
	DatabaseModule,
	HealthModule,
	KafkaModule,
	LoggerModule,
	MetricsModule,
	ScheduleModule,
	VersionModule,
} from '@azkaban/shared';
import { AppConfig } from '../config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VersionCache } from './version.cache';
import { VersionController } from './version.controller';

@Module({
	imports: [
		LoggerModule.forRoot(true, AppConfig.name),
		CacheModule.forRoot(true, AppConfig.redis),
		DatabaseModule.forRoot(
			true,
			AppConfig.environment,
			AppConfig.database,
			{},
		),
		HealthModule.forRoot(
			false,
			AppConfig.health,
			AppConfig.broker,
			AppConfig.redis,
		),
		MetricsModule.forRoot(false, AppConfig.name),
		VersionModule.forRoot(true, AppConfig.environment),
		BullModule.forRoot(true, AppConfig.redis, 10),
		EventEmitterModule.forRoot({
			wildcard: false,
			delimiter: '.',
			newListener: false,
			removeListener: false,
			maxListeners: 10,
			verboseMemoryLeak: false,
			ignoreErrors: false,
		}),
		KafkaModule.forRoot(
			true,
			{
				clientId: AppConfig.name,
				groupId: AppConfig.name + '-group',
				brokerHost: AppConfig.broker.brokerHost,
				brokerPort: AppConfig.broker.brokerPort,
				brokerUsername: AppConfig.broker.brokerUsername,
				brokerPassword: AppConfig.broker.brokerPassword,
				withSasl: AppConfig.environment !== 'local',
			},
			[...AzkabanSSETopicArray, ...AzkabanWebhookTopicArray],
		),
		ScheduleModule.forRoot(true),
	],
	controllers: [VersionController],
	providers: [VersionCache],
})
export class AppModule {}
