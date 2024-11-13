import { DynamicModule, Module } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import { AzkabanTwoFactorService } from '../services';

@Module({})
export class AzkabanTwoFactorModule {
	static forRoot(options: {
		global?: Optional<boolean>;
		appId?: Optional<string>;
		appSecretLength?: Optional<number>;
	}): DynamicModule {
		const { global, appId, appSecretLength } = options;
		return {
			module: AzkabanTwoFactorModule,
			imports: [],
			providers: [
				{
					provide: 'TWO_FACTOR_AUTHENTICATION_APP_NAME',
					useValue: appId ?? '',
				},
				{
					provide: 'TWO_FACTOR_AUTHENTICATION_APP_SECRET_LENGTH',
					useValue: appSecretLength ?? 12,
				},
				AzkabanTwoFactorService,
			],
			exports: [AzkabanTwoFactorService],
			global: global ?? false,
		};
	}
}
