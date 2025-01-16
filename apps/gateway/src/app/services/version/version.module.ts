import { Module } from '@nestjs/common';
import { VersionQueryHandler } from './queries';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { AzkabanVersionsService } from './azkaban-versions.service';
import { FoodfolioVersionsService } from './foodfolio-versions.service';
import { TwitchVersionsService } from './twitch-versions.service';
import { WarcraftVersionsService } from './warcraft-versions.service';
import { CoworkingVersionsService } from './coworking-versions.service';

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
			useValue: process.env.APP_VERSION,
		},
		AzkabanVersionsService,
		FoodfolioVersionsService,
		TwitchVersionsService,
		WarcraftVersionsService,
		CoworkingVersionsService,
		VersionService,
	],
})
export class VersionModule {}
