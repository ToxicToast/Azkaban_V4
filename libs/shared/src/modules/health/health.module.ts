import { DynamicModule, Module } from '@nestjs/common';
import { HealthConfig } from './health.config';
import { BrokerConfig } from './broker.config';
import { RedisConfig } from './redis.config';
import { TerminusModule } from '@nestjs/terminus';

@Module({})
export class HealthModule {
	static forRoot(
		config: HealthConfig,
		broker?: BrokerConfig,
		redis?: RedisConfig,
	): DynamicModule {
		return {
			module: HealthModule,
			imports: [
				TerminusModule.forRoot({
					errorLogStyle: 'pretty',
				}),
			],
			providers: [
				{
					provide: 'MEMORY_HEAP_TRESHOLD',
					useValue: config?.memoryHeapTreshold ?? 157286400,
				},
				{
					provide: 'MEMORY_RSS_TRESHOLD',
					useValue: config?.memoryRSSTreshold ?? 157286400,
				},
				{
					provide: 'BROKER_HOST',
					useValue: broker?.brokerHost ?? 'localhost',
				},
				{
					provide: 'BROKER_PORT',
					useValue: broker?.brokerPort ?? 9092,
				},
				{
					provide: 'REDIS_HOST',
					useValue: redis?.redisHost ?? 'localhost',
				},
				{
					provide: 'REDIS_PORT',
					useValue: redis?.redisPort ?? 6379,
				},
				{
					provide: 'REDIS_PASSWORD',
					useValue: redis?.redisPassword ?? 'super_secret_password',
				},
			],
			controllers: [],
		};
	}
}
