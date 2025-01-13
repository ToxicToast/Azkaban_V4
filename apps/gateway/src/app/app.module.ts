import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CacheModule } from './cache/cache.module';
import { ServicesModule } from './services/services.module';
import { CircuitModule } from './circuit/circuit.module';
import { KafkaModule } from './kafka/kafka.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
	imports: [
		HealthModule,
		MetricsModule,
		CacheModule,
		CircuitModule,
		KafkaModule,
		CqrsModule.forRoot(),
		ServicesModule,
	],
})
export class AppModule {}
