import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import {
	ActivateCommandHandler,
	CreateCommandHandler,
	DeactivateCommandHandler,
	DeleteCommandHandler,
	RestoreCommandHandler,
	UpdateCommandHandler,
} from './commands';
import {
	CharacterIdHandler,
	GuildQueryHandler,
	IdQueryHandler,
	ListQueryHandler,
} from './queries';

@Module({
	controllers: [CharacterController],
	providers: [
		CharacterService,
		CreateCommandHandler,
		UpdateCommandHandler,
		DeleteCommandHandler,
		RestoreCommandHandler,
		ActivateCommandHandler,
		DeactivateCommandHandler,
		ListQueryHandler,
		IdQueryHandler,
		CharacterIdHandler,
		GuildQueryHandler,
	],
})
export class CharacterModule {}
