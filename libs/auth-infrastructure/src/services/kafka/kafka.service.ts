import { Injectable } from '@nestjs/common';
import { KafkaService as BaseService } from '@toxictoast/sleepyazkaban-kafka';
import { KafkaAdapter } from '@toxictoast/sleepyazkaban-base-domain';

@Injectable()
export class KafkaService implements KafkaAdapter {
	constructor(private readonly service: BaseService) {}

	async connect(): Promise<void> {
		await this.service.connect();
	}

	async disconnect(): Promise<void> {
		await this.service.disconnect();
	}

	async emitEvent<PayloadType>(
		event: string,
		payload: PayloadType,
	): Promise<void> {
		await this.service.emitEvent(event, payload);
	}

	async emitResponse<PayloadType, ResponseType>(
		event: string,
		payload: PayloadType,
	): Promise<ResponseType> {
		return await this.service
			.emitResponse<PayloadType, ResponseType>(event, payload)
			.toPromise();
	}
}
