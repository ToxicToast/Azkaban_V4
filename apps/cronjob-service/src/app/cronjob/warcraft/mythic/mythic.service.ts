import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Nullable, WarcraftApiTopics } from '@azkaban/shared';
import { ApiMythicModel } from '../models';

@Injectable()
export class MythicService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	async getMythicFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiMythicModel>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.MYTHIC, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getMythicFromApi');
			return null;
		}
	}
}
