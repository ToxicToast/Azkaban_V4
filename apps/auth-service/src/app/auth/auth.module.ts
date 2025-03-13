import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCache } from './auth.cache';

@Module({
	controllers: [AuthController],
	providers: [AuthCache, AuthService],
})
export class AuthModule {}
