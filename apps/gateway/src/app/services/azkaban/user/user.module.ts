import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ListQueryHandler } from './queries';
import { UserService } from './user.service';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [ListQueryHandler];

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
