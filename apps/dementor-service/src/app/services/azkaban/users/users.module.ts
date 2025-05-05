import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IdQueryHandler, ListQueryHandler, UserIdHandler } from './queries';
import { CreateCommandHandler } from './commands';

@Module({
	controllers: [UsersController],
	providers: [
		UsersService,
		ListQueryHandler,
		IdQueryHandler,
		UserIdHandler,
		CreateCommandHandler,
	],
})
export class UsersModule {}
