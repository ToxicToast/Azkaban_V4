import { Module } from '@nestjs/common';
import { MetricsModule as BaseModule } from '@azkaban/shared';

@Module({
	imports: [BaseModule.forRoot(false, 'sse-service')],
})
export class MetricsModule {}
