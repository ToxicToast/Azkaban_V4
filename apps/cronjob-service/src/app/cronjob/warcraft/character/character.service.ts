import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

@Injectable()
export class CharacterService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	async getAllCharacters(): Promise<Array<CharacterDAO>> {
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
}
