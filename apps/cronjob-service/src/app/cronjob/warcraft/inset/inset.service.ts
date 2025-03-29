import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Nullable, WarcraftApiTopics } from '@azkaban/shared';
import { ApiInsetModel } from '../models';

@Injectable()
export class InsetService {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

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
			Logger.error(error, 'getInsetFromApi');
			return null;
		}
	}
}
