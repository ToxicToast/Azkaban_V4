import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		@Inject('TOPICS') private readonly topics: Array<string>,
	) {}

	async onModuleInit(): Promise<void> {
		this.topics.forEach((topic) => {
			this.client.subscribeToResponseOf(topic);
		});
		await this.client.connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close();
	}
}
