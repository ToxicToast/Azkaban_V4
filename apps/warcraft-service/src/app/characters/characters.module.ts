import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersCache } from './characters.cache';
import { DatabaseModule } from '@azkaban/shared';
import { CharacterEntity } from '@azkaban/warcraft-infrastructure';

@Module({
	imports: [
		DatabaseModule.forFeature(
			false,
			'CHARACTER_REPOSITORY',
			CharacterEntity,
		),
	],
	controllers: [CharactersController],
	providers: [CharactersCache, CharactersService],
	exports: [CharactersService],
})
export class CharactersModule {}
