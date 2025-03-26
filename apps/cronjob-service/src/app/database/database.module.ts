import { Module } from '@nestjs/common';
import { DatabaseModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';
import { CharacterEntity } from '@azkaban/warcraft-character-infrastructure';

@Module({
	imports: [
		BaseModule.forRoot(true, AppConfig.environment, AppConfig.database, {
			CharacterEntity,
		}),
		BaseModule.forFeature(true, 'CHARACTER_REPOSITORY', CharacterEntity),
	],
})
export class DatabaseModule {}
