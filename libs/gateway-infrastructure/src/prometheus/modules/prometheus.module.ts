import { DynamicModule, Module, Type } from '@nestjs/common';
import {
	PrometheusController,
	PrometheusModule,
} from '@willsoto/nestjs-prometheus';

@Module({})
export class PrometheusAzkabanModule {
	static forRoot(options: {
		name: string;
		controller: Type<PrometheusController>;
		global?: boolean;
	}): DynamicModule {
		const { name, controller, global } = options;

		return {
			module: PrometheusAzkabanModule,
			imports: [
				PrometheusModule.register({
					defaultMetrics: {
						enabled: true,
					},
					defaultLabels: {
						app: name,
					},
					path: '/metrics',
					controller: controller,
				}),
			],
			exports: [PrometheusModule],
			global: global ?? false,
		};
	}
}
