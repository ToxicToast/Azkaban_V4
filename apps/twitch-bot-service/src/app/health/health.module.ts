import { Module } from '@nestjs/common';
import { HealthModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [BaseModule.forRoot(false, AppConfig.health, AppConfig.broker)],
})
export class HealthModule {}
