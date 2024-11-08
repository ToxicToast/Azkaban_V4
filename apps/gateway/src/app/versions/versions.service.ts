import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { KafkaAuthService } from '@azkaban/gateway-infrastructure';

@Injectable()
export class VersionsService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('APP_VERSION') private readonly appVersion: string,
		private readonly authClient: KafkaAuthService,
	) {}

	async onModuleInit(): Promise<void> {
		await this.authClient.onModuleInit();
	}

	async onModuleDestroy(): Promise<void> {
		await this.authClient.onModuleDestroy();
	}

	async gatewayVersion(): Promise<unknown> {
		return this.appVersion;
	}

	async azkabanVersion(): Promise<unknown> {
		return {
			auth: null,
			users: null,
			groups: null,
			cronjobs: null,
			sse: null,
			webhooks: null,
			magpie: null,
			logging: null,
		};
	}

	async foodfolioVersion(): Promise<unknown> {
		return {
			category: null,
			company: null,
			location: null,
			size: null,
			type: null,
			item: null,
			item_detail: null,
			item_variant: null,
			warehouse: null,
			shoppinglist: null,
			recipelist: null,
			receipt: {
				rewe: null,
				aldi: null,
			},
			deals: {
				rewe: null,
			},
		};
	}

	async twitchVersion(): Promise<unknown> {
		return {
			bot: null,
			viewer: null,
			messages: null,
			streams: null,
			channels: null,
		};
	}

	async warcraftVersion(): Promise<unknown> {
		return {
			api: null,
			character: null,
			rio: null,
		};
	}

	async coworkingVersion(): Promise<unknown> {
		return {
			task: null,
		};
	}
}
