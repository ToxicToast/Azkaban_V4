import { Module } from '@nestjs/common';
import { MetricsModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [BaseModule.forRoot(false, AppConfig.name)],
})
export class MetricsModule {}
