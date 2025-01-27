import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule, KafkaModule } from '@azkaban/shared';
import { AppConfig } from '../../../config';
import { VersionService } from './version.service';
import { VersionProcessor } from './version.processor';
import { VersionCron } from './version.cron';

@Module({
	imports: [
		HttpModule,
		BullModule.registerQueue('azkaban-version'),
		KafkaModule.forRoot(
			false,
			{
				clientId: 'cronjob-service-version',
				groupId: 'cronjob-service-version-consumer',
				brokerHost: AppConfig.broker.brokerHost,
				brokerPort: AppConfig.broker.brokerPort,
				brokerUsername: AppConfig.broker.brokerUsername,
				brokerPassword: AppConfig.broker.brokerPassword,
			},
			[],
			AppConfig.environment,
		),
	],
	providers: [
		{
			provide: 'GATEWAY_URL',
			useValue: AppConfig.gateway,
		},
		VersionService,
		VersionProcessor,
		VersionCron,
	],
})
export class VersionModule {}
