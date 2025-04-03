import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ApiModule } from './api/api.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { GuildsModule } from './guilds/guilds.module';
import {
	CacheModule,
	DatabaseModule,
	HealthModule,
	LoggerModule,
	MetricsModule,
	VersionModule,
} from '@azkaban/shared';
import { AppConfig } from '../config';
import { VersionController } from './version.controller';
import { CharacterEntity } from '@azkaban/warcraft-infrastructure';

@Module({
	imports: [
		LoggerModule.forRoot(true, AppConfig.name),
		CacheModule.forRoot(true, AppConfig.redis),
		DatabaseModule.forRoot(
			true,
			AppConfig.environment,
			AppConfig.database,
			{
				CharacterEntity,
			},
		),
		HealthModule.forRoot(
			false,
			AppConfig.health,
			AppConfig.broker,
			AppConfig.redis,
		),
		MetricsModule.forRoot(false, AppConfig.name),
		VersionModule.forRoot(true, AppConfig.environment),
		ApiModule,
		CharactersModule,
		CronjobModule,
		GuildsModule,
	],
	controllers: [VersionController],
})
export class AppModule {}
