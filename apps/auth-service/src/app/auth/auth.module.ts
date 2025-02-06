import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfig } from '../../config';

@Module({
	controllers: [AuthController],
	providers: [
		{
			provide: 'AUTHORIZER_URL',
			useValue: AppConfig.authorizer.url,
		},
		{
			provide: 'AUTHORIZER_CLIENT_ID',
			useValue: AppConfig.authorizer.clientId,
		},
		AuthService,
	],
})
export class AuthModule {}
