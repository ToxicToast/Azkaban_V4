import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppConfig } from '../../config';
import { datasourceProvider, userProvider } from '@azkaban/user-infrastructure';

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
		),
		...userProvider,
		UserService,
	],
})
export class UserModule {}
