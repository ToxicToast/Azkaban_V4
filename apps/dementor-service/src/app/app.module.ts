import { Module } from '@nestjs/common';
import {
	CacheModule,
	CircuitModule,
	HealthModule,
	KafkaModule,
	LoggerModule,
	MetricsModule,
	WarcraftCharacterTopicArray,
	WarcraftGuildTopicArray,
	WarcraftTopicArray,
} from '@azkaban/shared';
import { AppConfig } from '../config';
import { CqrsModule } from '@nestjs/cqrs';
import { ServicesModule } from './services/services.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		CacheModule.forRoot(true, AppConfig.redis),
		CircuitModule.forRoot(true, {
			name: AppConfig.name,
			slidingWindowSize: 6,
			minimumNumberOfCalls: 10,
			failureRateThreshold: 60,
			slowCallDurationThreshold: 500,
			slowCallRateThreshold: 50,
			permittedNumberOfCallsInHalfOpenState: 10,
			openStateDelay: 10000,
			halfOpenStateMaxDelay: 30000,
			timeout: AppConfig.circuit.timeout,
		}),
		CqrsModule.forRoot(),
		HealthModule.forRoot(
			true,
			AppConfig.health,
			AppConfig.broker,
			AppConfig.redis,
		),
		JwtModule.register({
			global: true,
			secret: AppConfig.jwt,
			signOptions: {
				expiresIn: '1h',
			},
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
			[
				// Azkaban Services
				// Blog Services
				// Coworking Services
				// Discord Services
				// Foodfolio Services
				// Twitch Services
				// Warcraft Services
				...WarcraftCharacterTopicArray,
				...WarcraftGuildTopicArray,
				// Warhammer Services
				// Versioning
				...WarcraftTopicArray,
			],
		),
		LoggerModule.forRoot(true, AppConfig.name),
		MetricsModule.forRoot(true, AppConfig.name),
		//
		ServicesModule,
	],
})
export class AppModule {}
