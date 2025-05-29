import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginCommandHandler, RegisterCommandHandler } from './commands';
import { JwtStrategy } from '../../../strategies';
import { JwtAuthGuard } from '../../../guards';

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtAuthGuard,
		JwtStrategy,
		LoginCommandHandler,
		RegisterCommandHandler,
	],
})
export class AuthModule {}
