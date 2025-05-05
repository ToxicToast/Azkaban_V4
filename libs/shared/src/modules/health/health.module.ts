import { DynamicModule, Module } from '@nestjs/common';
import { HealthConfig } from './health.config';
import { BrokerConfig } from './broker.config';
import { RedisConfig } from './redis.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { Optional } from '../../types';
import { DatabaseConfig } from './database.config';

@Module({})
export class HealthModule {
	static forRoot(
		global: boolean,
		config: HealthConfig,
		broker?: Optional<BrokerConfig>,
		redis?: Optional<RedisConfig>,
		database?: Optional<DatabaseConfig>,
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

				{
					provide: 'DATABASE_TYPE',
					useValue: database?.databaseType ?? null,
				},
				{
					provide: 'DATABASE_HOST',
					useValue: database?.databaseHost ?? null,
				},
				{
					provide: 'DATABASE_PORT',
					useValue: database?.databasePort ?? null,
				},
				{
					provide: 'DATABASE_USERNAME',
					useValue: database?.databaseUsername ?? null,
				},
				{
					provide: 'DATABASE_PASSWORD',
					useValue: database?.databasePassword ?? null,
				},
				{
					provide: 'DATABASE_TABLE',
					useValue: database?.databaseTable ?? null,
				},
			],
			global,
		};
	}
}
