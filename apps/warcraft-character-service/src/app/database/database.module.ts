import { Module } from '@nestjs/common';
import { DatabaseModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [
		BaseModule.forRoot(true, AppConfig.environment, AppConfig.database, {}),
	],
})
export class DatabaseModule {}
