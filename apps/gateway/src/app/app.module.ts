import { Module } from '@nestjs/common';
import { HealthModule } from '@azkaban/shared';

@Module({
	imports: [
		HealthModule.forRoot(
			false,
			{
				memoryRSSTreshold: Number(process.env.MEMORY_RSS_TRESHOLD),
				memoryHeapTreshold: Number(process.env.MEMORY_HEAP_TRESHOLD),
			},
			{
				brokerHost: process.env.BROKER_HOST,
				brokerPort: Number(process.env.BROKER_PORT),
				brokerUsername: process.env.BROKER_USERNAME,
				brokerPassword: process.env.BROKER_PASSWORD,
			},
			{
				redisHost: process.env.REDIS_HOST,
				redisPort: Number(process.env.REDIS_PORT),
				redisPassword: process.env.REDIS_PASSWORD,
			},
		),
	],
})
export class AppModule {}
