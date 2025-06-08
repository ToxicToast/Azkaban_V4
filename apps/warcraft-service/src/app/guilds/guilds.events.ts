import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { AzkabanSSETopics, AzkabanWebhookTopics } from '@azkaban/shared';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class GuildsEvents {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	@Span('SendToSSE')
	private async sendToSSE(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanSSETopics.WARCRAFT, { payload })
			.toPromise();
	}

	@Span('SendToApiAlerts')
	private async sendToApiAlerts(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanWebhookTopics.APIALERTS, { payload })
			.toPromise();
	}

	@OnEvent('Warcraft.CreateGuild')
	async handleCreateGuildEvent(payload: unknown) {
		await this.sendToSSE(payload);
		await this.sendToApiAlerts(payload);
	}

	@OnEvent('Warcraft.ChangeFaction')
	async handleChangeFactionEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRaid')
	async handleChangeRaidEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeMemberCount')
	async handleChangeMemberCountEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}
}
