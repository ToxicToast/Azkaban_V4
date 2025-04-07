import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientKafka } from '@nestjs/microservices';
import { AzkabanSSETopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';

@Injectable()
export class CharactersEvents {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	@Span('SendToSSE')
	private async sendToSSE(payload: unknown): Promise<void> {
		await this.client.emit(AzkabanSSETopics.WARCRAFT, payload).toPromise();
	}

	@OnEvent('ChangeAvatar')
	async handleChangeAvatarEvent(payload: unknown) {
		Logger.log('ChangeAvatar event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeClass')
	async handleChangeClassEvent(payload: unknown) {
		Logger.log('ChangeClass event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeDisplayName')
	async handleChangeDisplayNameEvent(payload: unknown) {
		Logger.log('ChangeDisplayName event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeDisplayRealm')
	async handleChangeDisplayRealmEvent(payload: unknown) {
		Logger.log('ChangeDisplayRealm event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeFaction')
	async handleChangeFactionEvent(payload: unknown) {
		Logger.log('ChangeFaction event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeGender')
	async handleChangeGenderEvent(payload: unknown) {
		Logger.log('ChangeGenderEvent event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeGuild')
	async handleChangeGuildEvent(payload: unknown) {
		Logger.log('ChangeGuildEvent event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeInset')
	async handleChangeInsetEvent(payload: unknown) {
		Logger.log('ChangeInset event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeItemLevel')
	async handleChangeItemLevelEvent(payload: unknown) {
		Logger.log('ChangeItemLevel event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeLevel')
	async handleChangeLevelEvent(payload: unknown) {
		Logger.log('ChangeLevel event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeLoggedIn')
	async handleChangeLoggedInEvent(payload: unknown) {
		Logger.log('ChangeLoggedIn event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeMythic')
	async handleChangeMythicEvent(payload: unknown) {
		Logger.log('ChangeMythic event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeRace')
	async handleChangeRaceEvent(payload: unknown) {
		Logger.log('ChangeRace event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeRaid')
	async handleChangeRaidEvent(payload: unknown) {
		Logger.log('ChangeRaid event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeRank')
	async handleChangeRankEvent(payload: unknown) {
		Logger.log('ChangeRank event received', payload);
		await this.sendToSSE(payload);
	}

	@OnEvent('ChangeSpec')
	async handleChangeSpecEvent(payload: unknown) {
		Logger.log('ChangeSpec event received', payload);
		await this.sendToSSE(payload);
	}
}
