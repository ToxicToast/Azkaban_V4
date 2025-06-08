import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';
import { AzkabanSSETopics, AzkabanWebhookTopics } from '@azkaban/shared';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UsersEvents {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	@Span('SendToSSE')
	private async sendToSSE(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanSSETopics.AZKABAN, { payload })
			.toPromise();
	}

	@Span('SendToApiAlerts')
	private async sendToApiAlerts(payload: unknown): Promise<void> {
		await this.client
			.emit(AzkabanWebhookTopics.APIALERTS, { payload })
			.toPromise();
	}

	@OnEvent('Azkaban.CreateUser')
	async handleCreateUserEvent(payload: unknown) {
		await this.sendToSSE(payload);
		await this.sendToApiAlerts(payload);
	}

	@OnEvent('Azkaban.ChangeEmail')
	async handleChangeEmailEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Azkaban.ChangeLoggedIn')
	async handleChangeLoggedInEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Azkaban.ChangePassword')
	async handleChangePasswordEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Azkaban.ChangeSalt')
	async handleChangeSaltEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Azkaban.ChangeUsername')
	async handleChangeUsernameEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}
}
