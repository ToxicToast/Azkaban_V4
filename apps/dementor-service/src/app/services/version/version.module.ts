import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import {
	AzkabanVersionHandler,
	DementorVersionHandler,
	WarcraftVersionHandler,
} from './queries';
import { VersionController } from './version.controller';

@Module({
	controllers: [VersionController],
	providers: [
		VersionService,
		DementorVersionHandler,
		WarcraftVersionHandler,
		AzkabanVersionHandler,
	],
})
export class VersionModule {}
