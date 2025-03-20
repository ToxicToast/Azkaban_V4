import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { ApiModule } from './api/api.module';

@Module({
	imports: [HealthModule, MetricsModule, VersionModule, ApiModule],
})
export class AppModule {}
