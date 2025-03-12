import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppConfig } from '../../config';
import {
	datasourceProvider,
	UserEntity,
	userProvider,
} from '@azkaban/user-infrastructure';
import { UserCache } from './user.cache';

@Module({
	controllers: [UserController],
	providers: [
		...datasourceProvider(
			AppConfig.environment,
			AppConfig.database.databaseType,
			AppConfig.database.databaseHost,
			AppConfig.database.databasePort,
			AppConfig.database.databaseUsername,
			AppConfig.database.databasePassword,
			AppConfig.database.databaseTable,
			[UserEntity],
		),
		...userProvider,
		UserService,
		UserCache,
	],
})
export class UserModule {}
