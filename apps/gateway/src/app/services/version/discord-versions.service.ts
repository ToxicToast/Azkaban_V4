import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';
import {
	DiscordAscendApplyBotTopics,
	DiscordAscendJoinBotTopics,
	VersionCache,
} from '@azkaban/shared';

@Injectable()
export class DiscordVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async ascendJoinBot(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				DiscordAscendJoinBotTopics.VERSION,
				VersionCache.DISCORDASCENDJOINBOT,
			),
		);
	}

	private async ascendApplyBot(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				DiscordAscendApplyBotTopics.VERSION,
				VersionCache.DISCORDASCENDAPPLYBOT,
			),
		);
	}

	async getVersions() {
		const joinBot = await this.ascendJoinBot();
		const applyBot = await this.ascendApplyBot();
		//
		return {
			ascend: {
				joinBot,
				applyBot,
			},
		};
	}
}
