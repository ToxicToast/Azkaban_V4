import { Module } from '@nestjs/common';
import { HealthModule as BaseModule } from '@azkaban/shared';

const global = false;
const config = {
	memoryRSSTreshold: Number(process.env.MEMORY_RSS_TRESHOLD),
	memoryHeapTreshold: Number(process.env.MEMORY_HEAP_TRESHOLD),
};
const broker = {
	brokerHost: process.env.BROKER_HOST,
	brokerPort: Number(process.env.BROKER_PORT),
	brokerUsername: process.env.BROKER_USERNAME,
	brokerPassword: process.env.BROKER_PASSWORD,
};
const redis = {
	redisHost: process.env.REDIS_HOST,
	redisPort: Number(process.env.REDIS_PORT),
	redisPassword: process.env.REDIS_PASSWORD,
};

@Module({
	imports: [BaseModule.forRoot(global, config, broker, redis)],
})
export class HealthModule {}
