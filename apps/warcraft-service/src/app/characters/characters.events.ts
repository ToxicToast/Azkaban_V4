import { Inject, Injectable, Logger } from '@nestjs/common';
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
		Logger.log('CreateCharacter event received', payload);
		await this.sendToSSE(payload);
		await this.sendToApiAlerts(payload);
	}

	@OnEvent('Warcraft.ChangeAvatar')
	async handleChangeAvatarEvent(payload: unknown) {
		Logger.log('ChangeAvatar event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeClass')
	async handleChangeClassEvent(payload: unknown) {
		Logger.log('ChangeClass event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeDisplayName')
	async handleChangeDisplayNameEvent(payload: unknown) {
		Logger.log('ChangeDisplayName event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeDisplayRealm')
	async handleChangeDisplayRealmEvent(payload: unknown) {
		Logger.log('ChangeDisplayRealm event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeFaction')
	async handleChangeFactionEvent(payload: unknown) {
		Logger.log('ChangeFaction event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeGender')
	async handleChangeGenderEvent(payload: unknown) {
		Logger.log('ChangeGenderEvent event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeGuild')
	async handleChangeGuildEvent(payload: unknown) {
		Logger.log('ChangeGuildEvent event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeInset')
	async handleChangeInsetEvent(payload: unknown) {
		Logger.log('ChangeInset event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeItemLevel')
	async handleChangeItemLevelEvent(payload: unknown) {
		Logger.log('ChangeItemLevel event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeLevel')
	async handleChangeLevelEvent(payload: unknown) {
		Logger.log('ChangeLevel event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeLoggedIn')
	async handleChangeLoggedInEvent(payload: unknown) {
		Logger.log('ChangeLoggedIn event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeMythic')
	async handleChangeMythicEvent(payload: unknown) {
		Logger.log('ChangeMythic event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRace')
	async handleChangeRaceEvent(payload: unknown) {
		Logger.log('ChangeRace event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRaid')
	async handleChangeRaidEvent(payload: unknown) {
		Logger.log('ChangeRaid event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeRank')
	async handleChangeRankEvent(payload: unknown) {
		Logger.log('ChangeRank event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeSpec')
	async handleChangeSpecEvent(payload: unknown) {
		Logger.log('ChangeSpec event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('Warcraft.ChangeUser')
	async handleChangeUserEvent(payload: unknown) {
		Logger.log('ChangeUser event received', payload);
		await this.sendToSSE(payload);
	}
}
