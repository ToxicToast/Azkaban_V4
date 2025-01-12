import { DynamicModule, Module } from '@nestjs/common';
import { HealthConfig } from './health.config';
import { BrokerConfig } from './broker.config';
import { RedisConfig } from './redis.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({})
export class HealthModule {
	static forRoot(
		global: boolean,
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
			controllers: [HealthController],
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
					useValue: broker?.brokerHost ?? null,
				},
				{
					provide: 'BROKER_PORT',
					useValue: broker?.brokerPort ?? null,
				},
				{
					provide: 'REDIS_HOST',
					useValue: redis?.redisHost ?? null,
				},
				{
					provide: 'REDIS_PORT',
					useValue: redis?.redisPort ?? null,
				},
				{
					provide: 'REDIS_PASSWORD',
					useValue: redis?.redisPassword ?? null,
				},
			],
			global,
		};
	}
}
