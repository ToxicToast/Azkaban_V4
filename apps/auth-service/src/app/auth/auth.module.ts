import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [
		{
			provide: 'APP_VERSION',
			useValue: process.env.APP_VERSION,
		},
		AuthService,
	],
})
export class AuthModule {}
