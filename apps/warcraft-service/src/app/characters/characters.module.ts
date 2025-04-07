import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersCache } from './characters.cache';
import { CharactersEvents } from './characters.events';

@Module({
	controllers: [CharactersController],
	providers: [CharactersCache, CharactersService, CharactersEvents],
	exports: [CharactersService],
})
export class CharactersModule {}
