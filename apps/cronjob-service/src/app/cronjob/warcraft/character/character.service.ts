import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { ApiCharacterModel, CharacterModel } from '../models';

@Injectable()
export class CharacterService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	async getAllCharacters(): Promise<Array<CharacterModel>> {
		try {
			return await this.client
				.send(WarcraftCharacterTopics.LIST, {})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getAllCharacters');
			return [];
		}
	}

	async getCharacterFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiCharacterModel>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.CHARACTER, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getCharacterFromApi');
			return null;
		}
	}

	async getInsetFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.INSET, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getInsetFromApi');
			return null;
		}
	}

	async updateCharacter(
		id: string,
		character: ApiCharacterModel,
	): Promise<Nullable<CharacterModel>> {
		try {
			const gender_id = character.gender?.name ?? null;
			const faction_id = character.faction?.name ?? null;
			const race_id = character.race.name;
			const class_id = character.character_class.name;
			const spec_id = character.active_spec?.name ?? null;
			const level = character.level;
			const item_level = character.equipped_item_level;
			const guild_id = character.guild?.name ?? null;
			const display_realm = character.realm.name;
			const display_name = character.name;

			return await this.client
				.send(WarcraftCharacterTopics.UPDATE, {
					id,
					gender_id,
					faction_id,
					race_id,
					class_id,
					spec_id,
					level,
					item_level,
					guild_id,
					display_realm,
					display_name,
				})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'updateCharacter');
			return null;
		}
	}

	async deleteCharacter(id: string): Promise<void> {
		try {
			await this.client
				.send(WarcraftCharacterTopics.DELETE, { id })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'deleteCharacter');
		}
	}

	async restoreCharacter(id: string): Promise<void> {
		try {
			await this.client
				.send(WarcraftCharacterTopics.RESTORE, { id })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'restoreCharacter');
		}
	}
}
