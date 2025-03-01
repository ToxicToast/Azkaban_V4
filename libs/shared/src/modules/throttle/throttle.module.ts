import { DynamicModule, Module } from '@nestjs/common';
import {
	ThrottlerModule as BaseModule,
	seconds,
	ThrottlerGuard,
} from '@nestjs/throttler';
import { RedisConfig } from './redis.config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';
import Redis from 'ioredis';

@Module({})
export class ThrottleModule {
	static forRoot(
		global: boolean,
		name: string,
		ttl: number,
		limit: number,
		redis: RedisConfig,
	): DynamicModule {
		const redisClient = new Redis(redis.redisPort, redis.redisHost, {
			password: redis.redisPassword,
			db: redis.redisDb,
			connectionName: name,
		});
		return {
			module: ThrottleModule,
			imports: [
				BaseModule.forRoot({
					throttlers: [
						{
							name,
							ttl: seconds(ttl),
							limit,
						},
					],
					storage: new ThrottlerStorageRedisService(redisClient),
				}),
			],
			exports: [BaseModule],
			providers: [
				{
					provide: APP_GUARD,
					useClass: ThrottlerGuard,
				},
			],
			global,
		};
	}
}
