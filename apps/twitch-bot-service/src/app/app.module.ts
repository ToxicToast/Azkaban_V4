import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { KafkaModule } from './kafka/kafka.module';
import { BotModule } from './bot/bot.module';

@Module({
	imports: [
		HealthModule,
		MetricsModule,
		VersionModule,
		KafkaModule,
		BotModule,
	],
})
export class AppModule {}
