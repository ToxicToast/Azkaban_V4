import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { AzkabanSSETopics, AzkabanWebhookTopics } from '@azkaban/shared';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CharactersEvents {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	@Span('SendToSSE')
	private async sendToSSE(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanSSETopics.WARHAMMER, { payload })
			.toPromise();
	}

	@Span('SendToApiAlerts')
	private async sendToApiAlerts(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanWebhookTopics.APIALERTS, { payload })
			.toPromise();
	}

	@OnEvent('CreateWarhammerCharacter')
	async handleCreateCharacterEvent(payload: unknown) {
		Logger.log('CreateCharacter event received', payload);
		await this.sendToSSE(payload);
		await this.sendToApiAlerts(payload);
	}

	@OnEvent('ChangeWarhammerUser')
	async handleChangeUserEvent(payload: unknown) {
		Logger.log('ChangeUser event received', payload);
		await this.sendToSSE(payload);
	}

	// TODO: Add other events
}
