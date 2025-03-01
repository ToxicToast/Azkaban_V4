import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CacheModule } from './cache/cache.module';
import { ServicesModule } from './services/services.module';
import { CircuitModule } from './circuit/circuit.module';
import { KafkaModule } from './kafka/kafka.module';
import { CqrsModule } from './cqrs/cqrs.module';
import { JwtModule } from './jwt/jwt.module';
import { ThrottleModule } from '@azkaban/shared';
import { AppConfig } from '../config';

@Module({
	imports: [
		ThrottleModule.forRoot(true, 'dementor', 60, 10, {
			...AppConfig.redis,
			redisDb: 0,
		}),
		HealthModule,
		MetricsModule,
		CacheModule,
		CircuitModule,
		KafkaModule,
		CqrsModule,
		JwtModule,
		ServicesModule,
	],
})
export class AppModule {}
