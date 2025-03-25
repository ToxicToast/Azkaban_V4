import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { CharacterModel } from './character.model';

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
			Logger.error(error);
			return [];
		}
	}

	async getCharacterFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.CHARACTER, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error);
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
			Logger.error(error);
			return null;
		}
	}

	async updateCharacter(
		id: string,
		character: unknown,
	): Promise<Nullable<CharacterModel>> {
		try {
			return await this.client
				.send(WarcraftCharacterTopics.UPDATE, { character, id })
				.toPromise();
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	async deleteCharacter(id: string): Promise<void> {
		try {
			await this.client
				.send(WarcraftCharacterTopics.DELETE, { id })
				.toPromise();
		} catch (error) {
			Logger.error(error);
		}
	}

	async restoreCharacter(id: string): Promise<void> {
		try {
			await this.client
				.send(WarcraftCharacterTopics.RESTORE, { id })
				.toPromise();
		} catch (error) {
			Logger.error(error);
		}
	}
}
