import { DynamicModule, Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';
import { MetricsRoutes } from '../../routes';

@Module({})
export class MetricsModule {
	static forRoot(global: boolean, label: string): DynamicModule {
		return {
			module: MetricsModule,
			imports: [
				PrometheusModule.register({
					defaultMetrics: {
						enabled: true,
					},
					defaultLabels: {
						app: label,
					},
					path: MetricsRoutes.CONTROLLER,
					controller: MetricsController,
				}),
			],
			global,
		};
	}
}
