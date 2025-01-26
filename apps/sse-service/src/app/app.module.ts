import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { SseModule } from './sse/sse.module';

@Module({
	imports: [HealthModule, MetricsModule, VersionModule, SseModule],
})
export class AppModule {}
