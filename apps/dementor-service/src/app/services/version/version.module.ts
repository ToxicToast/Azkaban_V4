import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import {
	AzkabanVersionHandler,
	DementorVersionHandler,
	WarcraftVersionHandler,
	WarhammerVersionHandler,
	FoodfolioVersionHandler,
} from './queries';
import { VersionController } from './version.controller';
import { VersionCache } from './version.cache';

@Module({
	controllers: [VersionController],
	providers: [
		VersionService,
		DementorVersionHandler,
		WarcraftVersionHandler,
		AzkabanVersionHandler,
		WarhammerVersionHandler,
		FoodfolioVersionHandler,
		VersionCache,
	],
})
export class VersionModule {}
