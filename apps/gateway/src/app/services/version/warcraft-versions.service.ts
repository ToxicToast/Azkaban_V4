import { Injectable } from '@nestjs/common';
import {
	VersionCache,
	WarcraftApiTopics,
	WarcraftAuditTopics,
	WarcraftCharacterTopics,
	WarcraftGuildTopics,
	WarcraftRaiderTopics,
	WarcraftTopics,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class WarcraftVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async getVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(WarcraftTopics.VERSION, VersionCache.WARCRAFT),
		);
	}

	async getVersions() {
		const version = await this.getVersion();
		return version;
	}
}
