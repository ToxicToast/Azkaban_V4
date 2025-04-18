import { Module } from '@nestjs/common';
import {
	HealthModule,
	LoggerModule,
	MetricsModule,
	VersionModule,
} from '@azkaban/shared';
import { AppConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		HealthModule.forRoot(true, AppConfig.health, AppConfig.broker),
		LoggerModule.forRoot(true, AppConfig.name),
		MetricsModule.forRoot(true, AppConfig.name),
		VersionModule.forRoot(true, AppConfig.environment),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
