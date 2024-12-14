import { Module } from '@nestjs/common';
import { KafkaModule as BaseModule } from '@toxictoast/sleepyazkaban-kafka';
import { KafkaService } from './kafka.service';

@Module({
	imports: [
		BaseModule.register({
			appId: 'auth-service',
			brokerHost: 'localhost',
			brokerPort: 9092,
			global: true,
			topics: [],
			producerOnlyMode: false,
		}),
	],
	providers: [KafkaService],
	exports: [KafkaService],
})
export class KafkaModule {}
