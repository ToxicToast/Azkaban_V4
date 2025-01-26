import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { AuthModule } from './auth/auth.module';
import { VersionModule } from './version/version.module';

@Module({
	imports: [HealthModule, MetricsModule, VersionModule, AuthModule],
})
export class AppModule {}
