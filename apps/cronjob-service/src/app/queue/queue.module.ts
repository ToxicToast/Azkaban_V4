import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [BullModule.forRoot(true, AppConfig.redis, 5)],
})
export class QueueModule {}
