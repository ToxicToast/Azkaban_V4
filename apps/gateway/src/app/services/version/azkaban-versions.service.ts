import { Injectable } from '@nestjs/common';
import {
	AzkabanAuthTopics,
	AzkabanGroupTopics,
	AzkabanUserTopics,
	AzkabanCronjobTopics,
	AzkabanNotificationTopics,
	AzkabanEmailTopics,
	AzkabanSSETopics,
	AzkabanWebhookTopics,
	VersionCache,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class AzkabanVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async sseVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AzkabanSSETopics.VERSION, VersionCache.AZKABANSSE),
		);
	}

	private async authVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanAuthTopics.VERSION,
				VersionCache.AZKABANAUTH,
			),
		);
	}

	private async userVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanUserTopics.VERSION,
				VersionCache.AZKABANUSER,
			),
		);
	}

	private async groupVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanGroupTopics.VERSION,
				VersionCache.AZKABANGROUP,
			),
		);
	}

	private async cronjobVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanCronjobTopics.VERSION,
				VersionCache.AZKABANCRONJOB,
			),
		);
	}

	private async emailVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanEmailTopics.VERSION,
				VersionCache.AZKABANEMAIL,
			),
		);
	}

	private async notificationVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanNotificationTopics.VERSION,
				VersionCache.AZKABANNOTIFICATION,
			),
		);
	}

	private async webhookVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				AzkabanWebhookTopics.VERSION,
				VersionCache.AZKABANWEBHOOK,
			),
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
		const webhook = await this.webhookVersion();
		//
		return {
			sse,
			auth,
			user,
			group,
			cronjob,
			email,
			notification,
			webhook,
		};
	}
}
