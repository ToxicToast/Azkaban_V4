import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ServicesModule } from './services/services.module';

@Module({
	imports: [HealthModule, MetricsModule, ServicesModule],
})
export class AppModule {}
