import { Injectable } from '@nestjs/common';
import {
	TwitchApiTopics,
	TwitchBotTopics,
	TwitchChannelTopics,
	TwitchMessageTopics,
	TwitchStreamTopics,
	TwitchViewerTopics,
	VersionCache,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class TwitchVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async getApiVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchApiTopics.VERSION, VersionCache.TWITCHAPI),
		);
	}

	private async getBotVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchBotTopics.VERSION, VersionCache.TWITCHBOT),
		);
	}

	private async getViewerVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				TwitchViewerTopics.VERSION,
				VersionCache.TWITCHVIEWER,
			),
		);
	}

	private async getMessageVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				TwitchMessageTopics.VERSION,
				VersionCache.TWITCHMESSAGE,
			),
		);
	}

	private async getStreamVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				TwitchStreamTopics.VERSION,
				VersionCache.TWITCHSTREAM,
			),
		);
	}

	private async getChannelVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				TwitchChannelTopics.VERSION,
				VersionCache.TWITCHCHANNEL,
			),
		);
	}

	async getVersions() {
		const api = await this.getApiVersion();
		const bot = await this.getBotVersion();
		const viewer = await this.getViewerVersion();
		const message = await this.getMessageVersion();
		const stream = await this.getStreamVersion();
		const channel = await this.getChannelVersion();
		//
		return {
			api,
			bot,
			viewer,
			message,
			stream,
			channel,
		};
	}
}
