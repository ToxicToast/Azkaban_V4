import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { CreateCommandHandler, ListCommandHandler } from './commands';

@Module({
	controllers: [CharacterController],
	providers: [CharacterService, ListCommandHandler, CreateCommandHandler],
})
export class CharacterModule {}
