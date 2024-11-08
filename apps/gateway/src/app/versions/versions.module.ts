import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';

@Module({
	controllers: [VersionsController],
	providers: [
		{
			provide: 'APP_VERSION',
			useFactory: (config: ConfigService) => {
				return config.get('APP_VERSION', 'local');
			},
			inject: [ConfigService],
		},
		VersionsService,
	],
})
export class VersionsModule {}
