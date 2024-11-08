import { Inject, Injectable } from '@nestjs/common';
import { MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class RedisService {

	constructor(
		@Inject('REDIS_HOST') private readonly host: string,
		@Inject('REDIS_PORT') private readonly port: number,
		@Inject('REDIS_PASSWORD') private readonly password: number,
		private readonly microservices: MicroserviceHealthIndicator,
	) {}

	check() {
		return this.microservices.pingCheck('redis', {
			transport: Transport.REDIS,
			options: {
				host: this.host,
				port: this.port,
				password: this.password,
			},
		});
	}

}