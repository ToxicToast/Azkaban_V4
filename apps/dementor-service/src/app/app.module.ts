import { Module } from '@nestjs/common';
import { CacheModule, LoggerModule } from '@azkaban/shared';
import { AppConfig } from '../config';
import { CqrsModule } from '@nestjs/cqrs';
import { ServicesModule } from './services/services.module';

@Module({
	imports: [
		LoggerModule.forRoot(true, AppConfig.name),
		CacheModule.forRoot(true, AppConfig.redis),
		CqrsModule.forRoot(),
		//
		ServicesModule,
	],
})
export class AppModule {}
