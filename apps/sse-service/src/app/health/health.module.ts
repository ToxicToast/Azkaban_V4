import { Module } from '@nestjs/common';
import { HealthModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

const global = false;
const config = {
	memoryRSSTreshold: AppConfig.health.memoryRSSTreshold,
	memoryHeapTreshold: AppConfig.health.memoryHeapTreshold,
};
const broker = {
	brokerHost: AppConfig.broker.brokerHost,
	brokerPort: AppConfig.broker.brokerPort,
	brokerUsername: AppConfig.broker.brokerUsername,
	brokerPassword: AppConfig.broker.brokerPassword,
};

@Module({
	imports: [BaseModule.forRoot(global, config, broker)],
})
export class HealthModule {}
