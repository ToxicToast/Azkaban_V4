import { Module } from '@nestjs/common';
import {
	CreateCommandHandler,
	IdCommandHandler,
	ListCommandHandler,
} from './commands';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

export const CommandHandlers = [
	ListCommandHandler,
	IdCommandHandler,
	CreateCommandHandler,
];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	controllers: [CharacterController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		CharacterService,
	],
})
export class CharacterModule {}
