import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { IdQueryHandler, ListQueryHandler } from './queries';
import { UserService } from './user.service';
import { CreateCommandHandler } from './commands';

export const CommandHandlers = [CreateCommandHandler];
export const EventHandlers = [];
export const QueryHandlers = [ListQueryHandler, IdQueryHandler];

@Module({
	controllers: [UserController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		UserService,
	],
})
export class UserModule {}
