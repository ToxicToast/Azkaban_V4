import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CharacterCron } from './character.cron';
import { CharacterProcessor } from './character.processor';
import { CronjobService } from '../cronjob.service';
import { ApiModule } from '../../api/api.module';
import { CronjobCharacterController } from './character.controller';

@Module({
	imports: [ApiModule, BullModule.registerQueue('warcraft-character')],
	controllers: [CronjobCharacterController],
	providers: [CronjobService, CharacterCron, CharacterProcessor],
})
export class CharacterModule {}
