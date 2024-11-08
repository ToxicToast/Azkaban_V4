import { Controller, Get } from '@nestjs/common';
import { HealthLinks } from '@azkaban/gateway-infrastructure';
import { KafkaService } from './kafka.service';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RedisService } from './redis.service';
import { MemoryService } from './memory.service';

@Controller(HealthLinks.CONTROLLER)
export class HealthController {
	constructor(
		private readonly service: HealthCheckService,
		private readonly kafka: KafkaService,
		private readonly redis: RedisService,
		private readonly memory: MemoryService,
	) {}

	@Get()
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
