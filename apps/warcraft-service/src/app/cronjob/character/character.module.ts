import { Module } from '@nestjs/common';
import { BullModule, DatabaseModule } from '@azkaban/shared';
import { CharacterEntity } from '@azkaban/warcraft-infrastructure';

@Module({
	imports: [
		BullModule.registerQueue('blizzard-character'),
		DatabaseModule.forFeature(
			false,
			'CHARACTER_REPOSITORY',
			CharacterEntity,
		),
	],
	controllers: [],
	providers: [],
})
export class CharacterModule {}
