import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		HealthModule,
		MetricsModule,
		VersionModule,
		DatabaseModule,
		AuthModule,
	],
})
export class AppModule {}
