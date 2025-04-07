import { Controller, Get, HttpException, Inject } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	HealthIndicatorFunction,
	HealthIndicatorResult,
	MemoryHealthIndicator,
	MicroserviceHealthIndicator,
	TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { Nullable } from '../../types';
import { ControllerHelper } from '../../helpers';

@Controller(ControllerHelper('health'))
export class HealthController {
	constructor(
		@Inject('MEMORY_HEAP_TRESHOLD') private readonly heapTreshold: number,
		@Inject('MEMORY_RSS_TRESHOLD') private readonly rssTreshold: number,
		@Inject('BROKER_HOST') private readonly brokerHost: Nullable<string>,
		@Inject('BROKER_PORT') private readonly brokerPort: Nullable<number>,
		@Inject('REDIS_HOST') private readonly redisHost: Nullable<string>,
		@Inject('REDIS_PORT') private readonly redisPort: Nullable<number>,
		@Inject('REDIS_PASSWORD')
		private readonly redisPassword: Nullable<string>,
		@Inject('DATABASE_TYPE')
		private readonly databaseType: Nullable<string>,
		@Inject('DATABASE_HOST')
		private readonly databaseHost: Nullable<string>,
		@Inject('DATABASE_PORT')
		private readonly databasePort: Nullable<number>,
		@Inject('DATABASE_USERNAME')
		private readonly databaseUsername: Nullable<string>,
		@Inject('DATABASE_PASSWORD')
		private readonly databasePassword: Nullable<string>,
		@Inject('DATABASE_TABLE')
		private readonly databaseTable: Nullable<string>,
		private readonly service: HealthCheckService,
		private readonly memory: MemoryHealthIndicator,
		private readonly microservices: MicroserviceHealthIndicator,
		private readonly database: TypeOrmHealthIndicator,
	) {}

	private checkHeap(): () => Promise<HealthIndicatorResult> {
		return () => this.memory.checkHeap('memory_heap', this.heapTreshold);
	}

	private checkRss(): () => Promise<HealthIndicatorResult> {
		return () => this.memory.checkHeap('memory_rss', this.rssTreshold);
	}

	private checkBroker(): () => Promise<HealthIndicatorResult> {
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

	private checkRedis(): () => Promise<HealthIndicatorResult> {
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

	private checkDatabase(): () => Promise<HealthIndicatorResult> {
		return () =>
			this.database.pingCheck('database', {
				connection: {
					type: this.databaseType,
					host: this.databaseHost,
					port: this.databasePort,
					username: this.databaseUsername,
					password: this.databasePassword,
					database: this.databaseTable,
				},
			});
	}

	@Get()
	@HealthCheck()
	check(): Promise<HealthCheckResult> {
		try {
			const checkArray = new Array<HealthIndicatorFunction>();
			checkArray.push(this.checkHeap());
			checkArray.push(this.checkRss());
			if (this.brokerHost !== null && this.brokerPort !== null) {
				checkArray.push(this.checkBroker());
			}
			if (
				this.redisHost !== null &&
				this.redisPort !== null &&
				this.redisPassword !== null
			) {
				checkArray.push(this.checkRedis());
			}
			if (
				this.databaseType !== null &&
				this.databaseHost !== null &&
				this.databasePort !== null &&
				this.databaseUsername !== null &&
				this.databasePassword !== null &&
				this.databaseTable !== null
			) {
				checkArray.push(this.checkDatabase());
			}
			return this.service.check(checkArray);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
