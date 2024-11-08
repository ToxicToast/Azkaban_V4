import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionsModule } from './versions/versions.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import { KafkaAzkabanModule } from '@azkaban/gateway-infrastructure';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		KafkaAzkabanModule.forRoot({
			brokerHost: process.env.BROKER_HOST,
			brokerPort: parseInt(process.env.BROKER_PORT),
			producerOnlyMode: false,
			appId: 'gateway-service',
			global: true,
		}),
		//
		HealthModule,
		MetricsModule,
		VersionsModule,
		//
		AzkabanModule,
	],
})
export class AppModule {}
