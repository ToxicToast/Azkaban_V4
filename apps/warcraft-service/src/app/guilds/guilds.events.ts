import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { AzkabanSSETopics } from '@azkaban/shared';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class GuildsEvents {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	@Span('SendToSSE')
	private async sendToSSE(payload: unknown): Promise<void> {
		await this.client.emit(AzkabanSSETopics.WARCRAFT, payload).toPromise();
	}

	@OnEvent('ChangeFaction')
	async handleChangeFactionEvent(payload: unknown) {
		Logger.log('ChangeFaction event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeRaid')
	async handleChangeRaidEvent(payload: unknown) {
		Logger.log('ChangeRaid event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeMemberCount')
	async handleChangeMemberCountEvent(payload: unknown) {
		Logger.log('ChangeMemberCount event received', payload);
		await this.sendToSSE(payload);
	}
}
