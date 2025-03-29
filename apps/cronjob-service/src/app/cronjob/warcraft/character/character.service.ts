import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Nullable, WarcraftApiTopics } from '@azkaban/shared';
import { ApiCharacterModel } from '../models';

@Injectable()
export class CharacterService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

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
}
