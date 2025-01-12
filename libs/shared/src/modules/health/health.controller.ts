import { Controller, Get, HttpException, Inject } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	HealthIndicatorFunction,
	HealthIndicatorResult,
	MemoryHealthIndicator,
	MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
	constructor(
		@Inject('MEMORY_HEAP_TRESHOLD') private readonly heapTreshold: number,
		@Inject('MEMORY_RSS_TRESHOLD') private readonly rssTreshold: number,
		@Inject('BROKER_HOST') private readonly brokerHost: string | null,
		@Inject('BROKER_PORT') private readonly brokerPort: number | null,
		@Inject('REDIS_HOST') private readonly redisHost: string | null,
		@Inject('REDIS_PORT') private readonly redisPort: number | null,
		@Inject('REDIS_PASSWORD') private readonly redisPassword: string | null,
		private readonly service: HealthCheckService,
		private readonly memory: MemoryHealthIndicator,
		private readonly microservices: MicroserviceHealthIndicator,
	) {}

	private checkHeap(): () => Promise<HealthIndicatorResult> {
		return () => this.memory.checkHeap('memory_heap', this.heapTreshold);
	}

	private checkRss(): () => Promise<HealthIndicatorResult> {
		return () => this.memory.checkHeap('memory_rss', this.rssTreshold);
	}

	private checkBroker(): () => Promise<HealthIndicatorResult> {
		if (this.brokerHost !== null && this.brokerPort !== null) {
			return () =>
				this.microservices.pingCheck('broker', {
					transport: Transport.KAFKA,
					options: {
						client: {
							brokers: [`${this.brokerHost}:${this.brokerPort}`],
						},
					},
				});
		}
	}

	private checkRedis(): () => Promise<HealthIndicatorResult> {
		if (
			this.redisHost !== null &&
			this.redisPort !== null &&
			this.redisPassword !== null
		) {
			return () =>
				this.microservices.pingCheck('redis', {
					transport: Transport.REDIS,
					options: {
						host: this.redisHost,
						port: this.redisPort,
						password: this.redisPassword,
					},
				});
		}
	}

	@Get()
	@HealthCheck()
	check(): Promise<HealthCheckResult> {
		try {
			const checkArray = new Array<HealthIndicatorFunction>();
			checkArray.push(this.checkHeap());
			checkArray.push(this.checkRss());
			checkArray.push(this.checkBroker());
			checkArray.push(this.checkRedis());
			return this.service.check(checkArray);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
