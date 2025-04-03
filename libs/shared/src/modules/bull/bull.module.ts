import { DynamicModule, Module } from '@nestjs/common';
import { BullModule as BaseModule } from '@nestjs/bullmq';
import { RedisConfig } from './redis.config';

@Module({})
export class BullModule {
	static forRoot(
		global: boolean,
		redis: RedisConfig,
		delay: number,
	): DynamicModule {
		return {
			module: BullModule,
			imports: [
				BaseModule.forRootAsync({
					useFactory: async () => {
						const connection = {
							host: redis.redisHost,
							port: redis.redisPort,
							password: redis.redisPassword,
						};
						const defaultJobOptions = {
							delay,
							removeOnComplete: true,
						};
						return {
							connection,
							defaultJobOptions,
						};
					},
				}),
			],
			exports: [BaseModule],
			global,
		};
	}

	static registerQueue(name: string): DynamicModule {
		return {
			module: BullModule,
			imports: [
				BaseModule.registerQueue({
					name,
				}),
			],
			exports: [BaseModule],
		};
	}
}
