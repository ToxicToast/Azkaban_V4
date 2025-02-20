import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@azkaban/shared';
import { AppConfig } from '../../../../config';
import { VersionService } from './version.service';
import { VersionCron } from './version.cron';
import { VersionProcessor } from './version.processor';

@Module({
	imports: [HttpModule, BullModule.registerQueue('azkaban-version')],
	providers: [
		{
			provide: 'GATEWAY_URL',
			useValue: AppConfig.gateway,
		},
		VersionService,
		VersionProcessor,
		VersionCron,
	],
})
export class VersionModule {}
