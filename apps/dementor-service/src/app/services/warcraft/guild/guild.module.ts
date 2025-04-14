import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { GuildIdHandler, IdQueryHandler, ListQueryHandler } from './queries';
import {
	ActivateCommandHandler,
	CreateCommandHandler,
	DeleteCommandHandler,
	RestoreCommandHandler,
	UpdateCommandHandler,
} from './commands';

@Module({
	controllers: [GuildController],
	providers: [
		GuildService,
		ListQueryHandler,
		IdQueryHandler,
		GuildIdHandler,
		CreateCommandHandler,
		UpdateCommandHandler,
		DeleteCommandHandler,
		RestoreCommandHandler,
		ActivateCommandHandler,
	],
})
export class GuildModule {}
