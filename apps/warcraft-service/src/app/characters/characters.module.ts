import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersCache } from './characters.cache';

@Module({
	controllers: [CharactersController],
	providers: [CharactersCache, CharactersService],
	exports: [CharactersService],
})
export class CharactersModule {}
