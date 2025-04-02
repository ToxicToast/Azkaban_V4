import { Module } from '@nestjs/common';
import { AppConfig } from '../../config';
import { ApiService } from './api.service';

@Module({
	controllers: [],
	providers: [
		{
			provide: 'BLIZZARD_CLIENT_ID',
			useValue: AppConfig.blizzard.clientId,
		},
		{
			provide: 'BLIZZARD_CLIENT_SECRET',
			useValue: AppConfig.blizzard.clientSecret,
		},
		ApiService,
	],
	exports: [ApiService],
})
export class ApiModule {}
