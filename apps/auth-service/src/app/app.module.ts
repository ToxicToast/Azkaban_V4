import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [HealthModule, MetricsModule, AuthModule],
})
export class AppModule {}
