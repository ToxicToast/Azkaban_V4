import { Module } from '@nestjs/common';
import { CacheModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../app.config';

const global = true;

@Module({
	imports: [BaseModule.forRoot(global, AppConfig.redis)],
})
export class CacheModule {}
