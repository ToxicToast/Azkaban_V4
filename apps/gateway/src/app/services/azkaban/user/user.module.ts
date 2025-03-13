import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
	CacheCommandHandler,
	CreateCommandHandler,
	IdCommandHandler,
	ListCommandHandler,
} from './commands';
import { CacheSaga } from './sagas';

export const CommandHandlers = [
	CreateCommandHandler,
	IdCommandHandler,
	ListCommandHandler,
	CacheCommandHandler,
];
export const EventHandlers = [];
export const Sagas = [CacheSaga];

@Module({
	controllers: [UserController],
	providers: [...CommandHandlers, ...EventHandlers, ...Sagas, UserService],
})
export class UserModule {}
