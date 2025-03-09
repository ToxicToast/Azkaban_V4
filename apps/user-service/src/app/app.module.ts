import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { UserModule } from './user/user.module';
import { CacheModule } from './cache/cache.module';

@Module({
	imports: [
		HealthModule,
		MetricsModule,
		VersionModule,
		CacheModule,
		UserModule,
	],
})
export class AppModule {}
