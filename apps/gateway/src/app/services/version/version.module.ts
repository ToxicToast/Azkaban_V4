import { Module } from '@nestjs/common';
import { VersionQueryHandler } from './queries';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [VersionQueryHandler];

@Module({
	controllers: [VersionController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		...QueryHandlers,
		{
			provide: 'APP_VERSION',
			useValue: process.env.APP_VERSION,
		},
		VersionService,
	],
})
export class VersionModule {}
