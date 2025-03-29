import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionModule } from './version/version.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { QueueModule } from './queue/queue.module';
import { ScheduleModule } from './schedule/schedule.module';
import { KafkaModule } from './kafka/kafka.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		KafkaModule,
		DatabaseModule,
		HealthModule,
		MetricsModule,
		VersionModule,
		QueueModule,
		ScheduleModule,
		CronjobModule,
	],
})
export class AppModule {}
