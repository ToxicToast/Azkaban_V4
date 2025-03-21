import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftGuildTopics,
} from '@azkaban/shared';

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
			Logger.error(error);
			return [];
		}
	}

	async getGuildFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<unknown>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.GUILD, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}
}
