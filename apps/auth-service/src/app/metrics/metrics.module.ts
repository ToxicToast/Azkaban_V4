import { Module } from '@nestjs/common';
import { MetricsModule as BaseModule } from '@azkaban/shared';

@Module({
	imports: [BaseModule.forRoot(false, 'auth')],
})
export class MetricsModule {}
