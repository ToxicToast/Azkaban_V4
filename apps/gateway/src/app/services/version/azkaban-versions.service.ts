import { Injectable } from '@nestjs/common';
import {
	AzkabanAuthTopics,
	AzkabanGroupTopics,
	AzkabanUserTopics,
	AzkabanCronjobTopics,
	AzkabanNotificationTopics,
	AzkabanEmailTopics,
	AzkabanSSETopics,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class AzkabanVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async sseVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanSSETopics.VERSION),
		);
	}

	private async authVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanAuthTopics.VERSION),
		);
	}

	private async userVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanUserTopics.VERSION),
		);
	}

	private async groupVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanGroupTopics.VERSION),
		);
	}

	private async cronjobVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanCronjobTopics.VERSION),
		);
	}

	private async emailVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanEmailTopics.VERSION),
		);
	}

	private async notificationVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanNotificationTopics.VERSION),
		);
	}

	async getVersions() {
		const auth = await this.authVersion();
		const user = await this.userVersion();
		const group = await this.groupVersion();
		const cronjob = await this.cronjobVersion();
		const email = await this.emailVersion();
		const notification = await this.notificationVersion();
		const sse = await this.sseVersion();
		//
		return {
			sse,
			auth,
			user,
			group,
			cronjob,
			email,
			notification,
		};
	}
}
