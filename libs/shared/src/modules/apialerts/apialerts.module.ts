import { DynamicModule, Module } from '@nestjs/common';
import { ApiAlertsService } from './apialerts.service';

@Module({})
export class ApialertsModule {
	static forRoot(global: boolean, apiKey: string): DynamicModule {
		return {
			module: ApialertsModule,
			providers: [
				{
					provide: 'API_KEY',
					useValue: apiKey,
				},
				ApiAlertsService,
			],
			exports: [ApiAlertsService],
			global,
		};
	}
}
