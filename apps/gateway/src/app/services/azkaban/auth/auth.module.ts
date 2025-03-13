import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	RegisterCommandHandler,
	SSECommandHandler,
	UpdateLoginCommandHandler,
	WelcomeCommandHandler,
} from './commands';
import { LoginSaga, RegisterSaga } from './sagas';

export const CommandHandlers = [
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	RegisterCommandHandler,
	WelcomeCommandHandler,
	UpdateLoginCommandHandler,
	SSECommandHandler,
];
export const EventHandlers = [];
export const QueryHandlers = [];
export const Sagas = [RegisterSaga, LoginSaga];

@Module({
	controllers: [AuthController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		...Sagas,
		AuthService,
	],
})
export class AuthModule {}
