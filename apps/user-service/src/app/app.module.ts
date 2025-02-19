import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [HealthModule, MetricsModule, VersionModule, UserModule],
})
export class AppModule {}
