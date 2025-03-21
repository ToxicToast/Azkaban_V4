import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterCache } from './character.cache';
import { CharacterController } from './character.controller';

@Module({
	controllers: [CharacterController],
	providers: [CharacterService, CharacterCache],
})
export class CharacterModule {}
