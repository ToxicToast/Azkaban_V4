import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthSaga } from './auth.saga';
import {
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	RegisterCommandHandler,
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
];
export const EventHandlers = [];
export const QueryHandlers = [];
export const Sagas = [AuthSaga, RegisterSaga, LoginSaga];

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
