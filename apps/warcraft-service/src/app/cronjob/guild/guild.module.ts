import { Module } from '@nestjs/common';
import { ApiModule } from '../../api/api.module';
import { BullModule } from '@azkaban/shared';
import { guildCharactersQueue, guildQueue } from './guild.queue';
import { CronjobService } from '../cronjob.service';

@Module({
	imports: [
		ApiModule,
		BullModule.registerQueue(guildQueue),
		BullModule.registerQueue(guildCharactersQueue),
	],
	controllers: [],
	providers: [CronjobService],
})
export class GuildModule {}
