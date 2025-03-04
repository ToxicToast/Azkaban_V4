import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
	CreateQueryHandler,
	IdQueryHandler,
	ListQueryHandler,
} from './queries';
import { UserService } from './user.service';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [
	ListQueryHandler,
	IdQueryHandler,
	CreateQueryHandler,
];

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
