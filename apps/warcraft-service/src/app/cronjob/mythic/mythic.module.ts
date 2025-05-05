import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CronjobService } from '../cronjob.service';
import { ApiModule } from '../../api/api.module';
import { MythicCron } from './mythic.cron';
import { CronjobMythicController } from './mythic.controller';
import { MythicProcessor } from './mythic.processor';

@Module({
	imports: [ApiModule, BullModule.registerQueue('warcraft-mythic')],
	controllers: [CronjobMythicController],
	providers: [CronjobService, MythicCron, MythicProcessor],
})
export class MythicModule {}
