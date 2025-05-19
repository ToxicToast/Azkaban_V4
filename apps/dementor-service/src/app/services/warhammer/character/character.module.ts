import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import {
	CharacterIdHandler,
	IdQueryHandler,
	ListQueryHandler,
} from './queries';
import { CreateCommandHandler } from './commands';

@Module({
	controllers: [CharacterController],
	providers: [
		CharacterService,
		ListQueryHandler,
		IdQueryHandler,
		CharacterIdHandler,
		CreateCommandHandler,
	],
})
export class CharacterModule {}
