import { Module } from '@nestjs/common';
import { AppConfig } from '../../config';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
	controllers: [ApiController],
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
})
export class ApiModule {}
