import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { BotModule } from './bot/bot.module';

@Module({
	imports: [HealthModule, MetricsModule, VersionModule, BotModule],
})
export class AppModule {}
