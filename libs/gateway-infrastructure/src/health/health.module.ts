import { DynamicModule, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { MemoryService } from './memory.service';
import { HealthService } from './health.service';

@Module({})
export class HealthModule {
	static forRoot(global?: boolean): DynamicModule {
		return {
			module: HealthModule,
			imports: [
				ConfigModule,
				TerminusModule.forRoot({
					errorLogStyle: 'pretty',
				}),
			],
			providers: [
				{
					provide: 'KAFKA_HOST',
					useFactory: (config: ConfigService) => {
						return config.get<string>('BROKER_HOST', 'localhost');
					},
					inject: [ConfigService],
				},
				{
					provide: 'KAFKA_PORT',
					useFactory: (config: ConfigService) => {
						return config.get<number>('BROKER_PORT', 9092);
					},
					inject: [ConfigService],
				},
				{
					provide: 'REDIS_HOST',
					useFactory: (config: ConfigService) => {
						return config.get<string>('REDIS_HOST', 'localhost');
					},
					inject: [ConfigService],
				},
				{
					provide: 'REDIS_PORT',
					useFactory: (config: ConfigService) => {
						return config.get<number>('REDIS_PORT', 6379);
					},
					inject: [ConfigService],
				},
				{
					provide: 'REDIS_PASSWORD',
					useFactory: (config: ConfigService) => {
						return config.get<string>(
							'REDIS_PASSWORD',
							'supersecret',
						);
					},
					inject: [ConfigService],
				},
				{
					provide: 'MEMORY_HEAP_TRESHOLD',
					useFactory: (config: ConfigService) => {
						return config.get<number>('MEMORY_HEAP_TRESHOLD', 0);
					},
					inject: [ConfigService],
				},
				{
					provide: 'MEMORY_RSS_TRESHOLD',
					useFactory: (config: ConfigService) => {
						return config.get<number>('MEMORY_RSS_TRESHOLD', 0);
					},
					inject: [ConfigService],
				},
				KafkaService,
				RedisService,
				MemoryService,
				HealthService,
			],
			exports: [
				TerminusModule,
				KafkaService,
				RedisService,
				MemoryService,
				HealthService,
			],
			global: global ?? false,
		};
	}
}
