import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule as BaseModule } from '@nestjs/schedule';

@Module({})
export class ScheduleModule {
	static forRoot(global: boolean): DynamicModule {
		return {
			module: ScheduleModule,
			imports: [BaseModule.forRoot()],
			providers: [],
			exports: [BaseModule],
			global,
		};
	}
}
