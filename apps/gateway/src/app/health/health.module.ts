import { Module } from '@nestjs/common';
import { HealthModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

const global = false;

@Module({
	imports: [
		BaseModule.forRoot(
			global,
			AppConfig.health,
			AppConfig.broker,
			AppConfig.redis,
		),
	],
})
export class HealthModule {}
