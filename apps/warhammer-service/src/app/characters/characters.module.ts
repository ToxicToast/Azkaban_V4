import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersEvents } from './characters.events';
import { CharactersCache } from './characters.cache';

@Module({
	controllers: [CharactersController],
	providers: [CharactersService, CharactersEvents, CharactersCache],
	exports: [CharactersService],
})
export class CharactersModule {}
