import { Injectable } from '@nestjs/common';
import {
	TwitchApiTopics,
	TwitchBotTopics,
	TwitchChannelTopics,
	TwitchMessageTopics,
	TwitchStreamTopics,
	TwitchViewerTopics,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class TwitchVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async getApiVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchApiTopics.VERSION),
		);
	}

	private async getBotVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchBotTopics.VERSION),
		);
	}

	private async getViewerVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchViewerTopics.VERSION),
		);
	}

	private async getMessageVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchMessageTopics.VERSION),
		);
	}

	private async getStreamVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchStreamTopics.VERSION),
		);
	}

	private async getChannelVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(TwitchChannelTopics.VERSION),
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
