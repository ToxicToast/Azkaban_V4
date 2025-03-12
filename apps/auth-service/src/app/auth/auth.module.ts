import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfig } from '../../config';
import {
	datasourceProvider,
	UserEntity,
	userProvider,
} from '@azkaban/user-infrastructure';

@Module({
	controllers: [AuthController],
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
		AuthService,
	],
})
export class AuthModule {}
