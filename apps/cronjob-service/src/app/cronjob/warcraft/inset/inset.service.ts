import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { ApiInsetModel, CharacterModel } from '../models';

@Injectable()
export class InsetService {
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

	async getInsetFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiInsetModel>> {
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
		insetArray: ApiInsetModel,
	): Promise<Nullable<CharacterModel>> {
		try {
			const inset = insetArray.assets.find(
				(asset) => asset.key === 'inset',
			);

			return await this.client
				.send(WarcraftCharacterTopics.UPDATE, {
					id,
					inset: inset?.value ?? null,
				})
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
