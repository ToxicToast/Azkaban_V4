import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CronjobService } from '../cronjob.service';
import { ApiModule } from '../../api/api.module';

@Module({
	imports: [ApiModule, BullModule.registerQueue('warcraft-raid')],
	controllers: [],
	providers: [CronjobService],
})
export class RaidModule {}
