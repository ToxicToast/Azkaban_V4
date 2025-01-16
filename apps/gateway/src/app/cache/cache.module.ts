import { Module } from '@nestjs/common';
import { CacheModule as BaseModule } from '@azkaban/shared';

const global = true;
const redis = {
	redisHost: process.env.REDIS_HOST,
	redisPort: Number(process.env.REDIS_PORT),
	redisPassword: process.env.REDIS_PASSWORD,
};

@Module({
	imports: [BaseModule.forRoot(global, redis)],
})
export class CacheModule {}
