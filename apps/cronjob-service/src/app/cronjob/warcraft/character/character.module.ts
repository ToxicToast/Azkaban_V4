import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CharacterService } from './character.service';
import { CharacterCron } from './character.cron';
import { CharacterProcessor } from './character.processor';

@Module({
	imports: [BullModule.registerQueue('blizzard-character')],
	providers: [CharacterService, CharacterCron, CharacterProcessor],
})
export class CharacterModule {}
