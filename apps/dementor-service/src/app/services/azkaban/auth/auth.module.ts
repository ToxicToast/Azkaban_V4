import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginCommandHandler, RegisterCommandHandler } from './commands';
import { JwtStrategy } from '../../../strategies';

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		LoginCommandHandler,
		RegisterCommandHandler,
	],
})
export class AuthModule {}
