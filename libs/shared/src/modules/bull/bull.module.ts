import { DynamicModule, Module } from '@nestjs/common';
import { BullModule as BaseModule } from '@nestjs/bullmq';
import { RedisConfig } from './redis.config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

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
				BullBoardModule.forRoot({
					route: '/queues',
					adapter: ExpressAdapter,
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
				BullBoardModule.forFeature({
					name: name,
					adapter: BullMQAdapter,
				}),
			],
			exports: [BaseModule],
		};
	}
}
