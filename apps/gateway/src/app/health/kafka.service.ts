import { Inject, Injectable } from '@nestjs/common';
import { MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Injectable()
export class KafkaService {

	constructor(
		@Inject('KAFKA_HOST') private readonly host: string,
		@Inject('KAFKA_PORT') private readonly port: number,
		private readonly microservices: MicroserviceHealthIndicator,
	) {}

	check() {
		return this.microservices.pingCheck('kafka', {
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: [`${this.host}:${this.port}`],
				},
				producer: {
					createPartitioner: Partitioners.LegacyPartitioner,
				}
			},
		});
	}

}