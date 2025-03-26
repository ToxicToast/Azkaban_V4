import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CharacterService } from './character.service';
import { CharacterCron } from './character.cron';
import { CharacterProcessor } from './character.processor';
import { CharacterController } from './character.controller';
import { DatabaseCharactersService } from '../services/character.service';

@Module({
	imports: [BullModule.registerQueue('blizzard-character')],
	controllers: [CharacterController],
	providers: [
		CharacterService,
		DatabaseCharactersService,
		CharacterCron,
		CharacterProcessor,
	],
})
export class CharacterModule {}
