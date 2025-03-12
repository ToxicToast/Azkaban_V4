import { Module } from '@nestjs/common';
import { DatabaseModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';
import { UserEntity } from '@azkaban/user-infrastructure';

@Module({
	imports: [
		BaseModule.forRoot(true, AppConfig.environment, AppConfig.database, {
			UserEntity,
		}),
		BaseModule.forFeature(true, 'USER_REPOSITORY', UserEntity),
	],
})
export class DatabaseModule {}
