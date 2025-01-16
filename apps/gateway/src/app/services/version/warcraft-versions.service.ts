import { Injectable } from '@nestjs/common';
import {
	VersionCache,
	WarcraftApiTopics,
	WarcraftAuditTopics,
	WarcraftCharacterTopics,
	WarcraftRaiderTopics,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class WarcraftVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async getCharactersVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				WarcraftCharacterTopics.VERSION,
				VersionCache.WARCRAFTCHARACTER,
			),
		);
	}

	private async getApiVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				WarcraftApiTopics.VERSION,
				VersionCache.WARCRAFTAPI,
			),
		);
	}

	private async getRaiderVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				WarcraftRaiderTopics.VERSION,
				VersionCache.WARCRAFTRAIDER,
			),
		);
	}

	private async getAuditVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				WarcraftAuditTopics.VERSION,
				VersionCache.WARCRAFTAUDIT,
			),
		);
	}

	async getVersions() {
		const character = await this.getCharactersVersion();
		const api = await this.getApiVersion();
		const raider = await this.getRaiderVersion();
		const audit = await this.getAuditVersion();
		//
		return {
			character,
			api,
			raider,
			audit,
		};
	}
}
