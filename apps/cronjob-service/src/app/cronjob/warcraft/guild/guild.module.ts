import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { GuildService } from './guild.service';
import { GuildCron } from './guild.cron';
import { GuildProcessor } from './guild.processor';
import { GuildController } from './guild.controller';

@Module({
	imports: [BullModule.registerQueue('blizzard-guild')],
	controllers: [GuildController],
	providers: [GuildService, GuildCron, GuildProcessor],
})
export class GuildModule {}
