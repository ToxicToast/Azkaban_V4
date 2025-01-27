import { Module } from '@nestjs/common';
import { ScheduleModule as BaseModule } from '@azkaban/shared';

@Module({
	imports: [BaseModule.forRoot(true)],
})
export class ScheduleModule {}
