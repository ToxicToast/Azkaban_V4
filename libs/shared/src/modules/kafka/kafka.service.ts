import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { sleep } from '@nestjs/terminus/dist/utils';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		@Inject('TOPICS') private readonly topics: Array<string>,
	) {}

	async onModuleInit(): Promise<void> {
		this.topics.forEach((topic) => {
			this.client.subscribeToResponseOf(topic);
			Logger.log(topic, KafkaService.name);
		});
		await sleep(500);
		await this.client.connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close();
	}
}
