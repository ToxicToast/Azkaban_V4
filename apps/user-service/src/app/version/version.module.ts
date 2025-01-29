import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { AppConfig } from '../../config';

@Module({
	controllers: [VersionController],
	providers: [
		{
			provide: 'APP_VERSION',
			useValue: AppConfig.environment,
		},
		VersionService,
	],
})
export class VersionModule {}
