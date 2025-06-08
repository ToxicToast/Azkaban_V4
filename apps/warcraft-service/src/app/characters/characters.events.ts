import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanSSETopics, AzkabanWebhookTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';

@Injectable()
export class CharactersEvents {
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

	@OnEvent('Warcraft.CreateCharacter')
	async handleCreateCharacterEvent(payload: unknown) {
		await this.sendToSSE(payload);
		await this.sendToApiAlerts(payload);
	}

	@OnEvent('Warcraft.ChangeAvatar')
	async handleChangeAvatarEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeClass')
	async handleChangeClassEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeDisplayName')
	async handleChangeDisplayNameEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeDisplayRealm')
	async handleChangeDisplayRealmEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeFaction')
	async handleChangeFactionEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeGender')
	async handleChangeGenderEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeGuild')
	async handleChangeGuildEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeInset')
	async handleChangeInsetEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeItemLevel')
	async handleChangeItemLevelEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeLevel')
	async handleChangeLevelEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeLoggedIn')
	async handleChangeLoggedInEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeMythic')
	async handleChangeMythicEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRace')
	async handleChangeRaceEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRaid')
	async handleChangeRaidEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRank')
	async handleChangeRankEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeSpec')
	async handleChangeSpecEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeUser')
	async handleChangeUserEvent(payload: unknown) {
		await this.sendToSSE(payload);
	}
}
