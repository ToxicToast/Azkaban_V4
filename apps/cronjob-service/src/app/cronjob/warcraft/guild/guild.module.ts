import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { GuildService } from './guild.service';
import { GuildCron } from './guild.cron';
import { GuildProcessor } from './guild.processor';

@Module({
	imports: [BullModule.registerQueue('blizzard-guild')],
	providers: [GuildService, GuildCron, GuildProcessor],
})
export class GuildModule {}
