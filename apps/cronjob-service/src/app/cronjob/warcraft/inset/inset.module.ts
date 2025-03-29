import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { InsetController } from './inset.controller';
import { InsetCron } from './inset.cron';
import { InsetService } from './inset.service';
import { InsetProcessor } from './inset.processor';
import { DatabaseCharactersService } from '../services/character.service';

@Module({
	imports: [BullModule.registerQueue('blizzard-inset')],
	controllers: [InsetController],
	providers: [
		InsetService,
		DatabaseCharactersService,
		InsetCron,
		InsetProcessor,
	],
})
export class InsetModule {}
