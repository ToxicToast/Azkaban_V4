import { Module } from '@nestjs/common';
import { VersionQueryHandler } from './queries';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { AzkabanVersionsService } from './azkaban-versions.service';
import { FoodfolioVersionsService } from './foodfolio-versions.service';
import { TwitchVersionsService } from './twitch-versions.service';
import { WarcraftVersionsService } from './warcraft-versions.service';
import { CoworkingVersionsService } from './coworking-versions.service';
import { DiscordVersionsService } from './discord-versions.service';
import { BlogVersionsService } from './blog-versions.service';
import { AppConfig } from '../../../config';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [VersionQueryHandler];

@Module({
	controllers: [VersionController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		{
			provide: 'APP_VERSION',
			useValue: AppConfig.environment,
		},
		AzkabanVersionsService,
		FoodfolioVersionsService,
		TwitchVersionsService,
		WarcraftVersionsService,
		CoworkingVersionsService,
		DiscordVersionsService,
		BlogVersionsService,
		VersionService,
	],
})
export class VersionModule {}
