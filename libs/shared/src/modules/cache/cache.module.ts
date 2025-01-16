import { DynamicModule, Module } from '@nestjs/common';
import { CacheModule as BaseModule, CacheStore } from '@nestjs/cache-manager';
import { RedisConfig } from './redis.config';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';

@Module({})
export class CacheModule {
	static forRoot(global: boolean, redis: RedisConfig): DynamicModule {
		const FIVE_MINUTES = 5 * 60000;
		return {
			module: CacheModule,
			imports: [
				BaseModule.registerAsync({
					useFactory: async () => {
						const store = await redisStore({
							socket: {
								host: redis.redisHost,
								port: redis.redisPort,
							},
							password: redis.redisPassword,
						});
						return {
							store: store as unknown as CacheStore,
							ttl: redis.ttl ?? FIVE_MINUTES,
						};
					},
				}),
			],
			providers: [
				CacheService,
				{
					provide: 'TTL_CONFIG',
					useValue: redis.ttl ?? FIVE_MINUTES,
				},
			],
			exports: [BaseModule, CacheService],
			global,
		};
	}
}
