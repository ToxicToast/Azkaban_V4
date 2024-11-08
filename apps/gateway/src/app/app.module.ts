import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionsModule } from './versions/versions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		//
		HealthModule,
		MetricsModule,
		VersionsModule,
		//
		AuthModule
	],
})
export class AppModule {}
