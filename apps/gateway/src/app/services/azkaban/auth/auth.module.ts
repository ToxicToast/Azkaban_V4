import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthSaga } from './auth.saga';
import {
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	RegisterCommandHandler,
	WelcomeCommandHandler,
} from './commands';
import { RegisterSaga } from './sagas';
import { JwtModule } from '../../../jwt/jwt.module';

export const CommandHandlers = [
	ForgetPasswordCommandHandler,
	LoginCommandHandler,
	RegisterCommandHandler,
	WelcomeCommandHandler,
];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	imports: [JwtModule],
	controllers: [AuthController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		AuthSaga,
		AuthService,
		RegisterSaga,
	],
})
export class AuthModule {}
