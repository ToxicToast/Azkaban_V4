import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { DementorVersionHandler, WarcraftVersionHandler } from './queries';
import { VersionController } from './version.controller';

@Module({
	controllers: [VersionController],
	providers: [VersionService, DementorVersionHandler, WarcraftVersionHandler],
})
export class VersionModule {}
