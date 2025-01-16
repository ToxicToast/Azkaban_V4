import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';

@Module({
	controllers: [VersionController],
	providers: [
		{
			provide: 'APP_VERSION',
			useValue: process.env.APP_VERSION,
		},
		VersionService,
	],
})
export class VersionModule {}
