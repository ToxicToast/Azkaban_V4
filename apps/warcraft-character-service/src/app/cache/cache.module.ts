import { Module } from '@nestjs/common';
import { CacheModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [BaseModule.forRoot(true, AppConfig.redis)],
})
export class CacheModule {}
