import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginCommandHandler } from './commands';

@Module({
	controllers: [AuthController],
	providers: [AuthService, LoginCommandHandler],
})
export class AuthModule {}
