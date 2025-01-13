import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { AuthTopics, NotificationTopics } from '@azkaban/shared';
import { VersionQuery } from './queries';

@Injectable()
export class VersionService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly queryBus: QueryBus,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(AuthTopics.VERSION);
		this.client.subscribeToResponseOf(NotificationTopics.VERSION);
		await this.client.connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close();
	}

	private async authVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(AuthTopics.VERSION),
		);
	}

	private async notificationVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(NotificationTopics.VERSION),
		);
	}

	async generateVersions(): Promise<unknown> {
		return await Promise.all([
			this.authVersion(),
			this.notificationVersion(),
		]).then((versions) => {
			return {
				auth: versions[0],
				notification: versions[1],
			};
		});
	}
}
