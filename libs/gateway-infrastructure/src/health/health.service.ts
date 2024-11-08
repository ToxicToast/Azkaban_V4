import { Injectable } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { KafkaService } from './kafka.service';
import { RedisService } from './redis.service';
import { MemoryService } from './memory.service';

@Injectable()
export class HealthService {
	constructor(
		private readonly service: HealthCheckService,
		private readonly kafka: KafkaService,
		private readonly redis: RedisService,
		private readonly memory: MemoryService,
	) {}

	@HealthCheck()
	check() {
		return this.service.check([
			() => this.kafka.check(),
			() => this.redis.check(),
			() => this.memory.checkHeap(),
			() => this.memory.checkRSS(),
		]);
	}
}
