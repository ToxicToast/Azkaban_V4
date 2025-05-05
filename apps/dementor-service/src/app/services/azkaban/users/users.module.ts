import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IdQueryHandler, ListQueryHandler } from './queries';
import { CreateCommandHandler } from './commands';

@Module({
	controllers: [UsersController],
	providers: [
		UsersService,
		ListQueryHandler,
		IdQueryHandler,
		CreateCommandHandler,
	],
})
export class UsersModule {}
