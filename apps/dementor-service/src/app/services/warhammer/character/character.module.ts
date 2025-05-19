import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import {
	CharacterIdHandler,
	IdQueryHandler,
	ListQueryHandler,
} from './queries';

@Module({
	controllers: [CharacterController],
	providers: [
		CharacterService,
		ListQueryHandler,
		IdQueryHandler,
		CharacterIdHandler,
	],
})
export class CharacterModule {}
