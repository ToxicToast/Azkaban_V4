import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
	static forRoot(global: boolean): DynamicModule {
		return {
			module: DatabaseModule,
			providers: [],
			exports: [],
			global,
		};
	}
}
