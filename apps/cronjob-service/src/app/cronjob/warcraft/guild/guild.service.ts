import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
	WarcraftGuildTopics,
} from '@azkaban/shared';
import { ApiGuildModel } from '../models';

@Injectable()
export class GuildService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	async getAllGuilds(): Promise<Array<unknown>> {
		try {
			return await this.client
				.send(WarcraftGuildTopics.LIST, {})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getAllGuilds');
			return [];
		}
	}

	async getGuildFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiGuildModel>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.GUILD, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getGuildFromApi');
			return null;
		}
	}

	async checkCharacterExists(
		region: string,
		realm: string,
		name: string,
	): Promise<{ id: string }> {
		try {
			return await this.client
				.send(WarcraftCharacterTopics.CHECK, {
					region,
					realm,
					name,
				})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'checkCharacterExists');
			return null;
		}
	}

	async updateCharacter(
		id: string,
		rank_id: Nullable<number>,
	): Promise<void> {
		try {
			await this.client
				.emit(WarcraftCharacterTopics.UPDATE, {
					id,
					rank_id,
				})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'updateCharacter');
		}
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
		rank_id: Nullable<number>,
	): Promise<void> {
		try {
			await this.client
				.emit(WarcraftCharacterTopics.CREATE, {
					region,
					realm,
					name,
					rank_id,
				})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'createCharacter');
		}
	}
}
