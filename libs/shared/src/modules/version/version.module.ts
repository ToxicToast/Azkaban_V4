import { DynamicModule, Module } from '@nestjs/common';
import { VersionService } from './version.service';
@Module({})
export class VersionModule {
	static forRoot(global: boolean, version: string): DynamicModule {
		return {
			module: VersionModule,
			providers: [
				{
					provide: 'APP_VERSION',
					useValue: version,
				},
				VersionService,
			],
			exports: [VersionService],
			global,
		};
	}
}
