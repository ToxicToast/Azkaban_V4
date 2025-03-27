import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { MythicController } from './mythic.controller';
import { DatabaseCharactersService } from '../services/character.service';
import { MythicCron } from './mythic.cron';
import { MythicProcessor } from './mythic.processor';

@Module({
	imports: [BullModule.registerQueue('blizzard-mythic')],
	controllers: [MythicController],
	providers: [DatabaseCharactersService, MythicCron, MythicProcessor],
})
export class MythicModule {}
