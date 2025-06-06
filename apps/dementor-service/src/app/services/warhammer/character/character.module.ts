import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import {
	CharacterIdHandler,
	IdQueryHandler,
	ListQueryHandler,
} from './queries';
import {
	ActivateCommandHandler,
	CreateCommandHandler,
	DeactivateCommandHandler,
	DeleteCommandHandler,
	RestoreCommandHandler,
	AssignCommandHandler,
} from './commands';

@Module({
	controllers: [CharacterController],
	providers: [
		CharacterService,
		ListQueryHandler,
		IdQueryHandler,
		CharacterIdHandler,
		CreateCommandHandler,
		DeleteCommandHandler,
		RestoreCommandHandler,
		ActivateCommandHandler,
		DeactivateCommandHandler,
		AssignCommandHandler,
	],
})
export class CharacterModule {}
