import { Module } from '@nestjs/common';
import { PrometheusAzkabanModule } from '@azkaban/gateway-infrastructure';
import { MetricsController } from './metrics.controller';

@Module({
	imports: [
		PrometheusAzkabanModule.forRoot({
			name: 'azkaban-gateway',
			controller: MetricsController,
		}),
	],
})
export class MetricsModule {}
