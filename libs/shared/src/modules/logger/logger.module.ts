import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
	static forRoot(global: boolean, serviceName: string): DynamicModule {
		return {
			module: LoggerModule,
			imports: [],
			providers: [
				{
					provide: 'SERVICE_NAME',
					useValue: serviceName,
				},
				LoggerService,
			],
			exports: [LoggerService],
			global,
		};
	}
}
