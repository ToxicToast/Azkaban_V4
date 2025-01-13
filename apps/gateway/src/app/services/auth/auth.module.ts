import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthSaga } from './auth.saga';
import {
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	NotificationCommandHandler,
	RegisterCommandHandler,
} from './commands';
import { LoginEventHandler } from './events';

export const CommandHandlers = [
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	NotificationCommandHandler,
	RegisterCommandHandler,
];
export const EventHandlers = [LoginEventHandler];
export const QueryHandlers = [];

@Module({
	controllers: [AuthController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		AuthSaga,
		AuthService,
	],
})
export class AuthModule {}
