import { Module } from '@nestjs/common';
import {
	KafkaModule as BaseModule,
	AzkabanAuthTopicArray,
	AzkabanCronjobTopicArray,
	AzkabanEmailTopicArray,
	AzkabanGroupTopicArray,
	AzkabanSSETopicArray,
	AzkabanUserTopicArray,
	FoodFolioCategoryTopicArray,
	FoodFolioCompanyTopicArray,
	FoodFolioItemDetailTopicArray,
	FoodFolioItemTopicArray,
	FoodFolioItemVariantTopicArray,
	FoodFolioLocationTopicArray,
	FoodFolioShoppinglistTopicArray,
	FoodFolioSizeTopicArray,
	FoodFolioTypeTopicArray,
	FoodFolioWarehouseTopicArray,
	TwitchApiTopicArray,
	TwitchBotTopicArray,
	TwitchChannelTopicArray,
	TwitchMessageTopicArray,
	TwitchStreamTopicArray,
	TwitchViewerTopicArray,
	WarcraftApiTopicArray,
	WarcraftCharacterTopicArray,
	WarcraftRaiderTopicArray,
	CoworkingTasksTopicArray,
	WarcraftAuditTopicArray,
	AzkabanWebhookTopicArray,
	DiscordAscendApplyBotTopicArray,
	DiscordAscendJoinBotTopicArray,
} from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [
		BaseModule.forRoot(
			true,
			{
				clientId: 'gateway',
				groupId: 'gateway-consumer',
				brokerHost: AppConfig.broker.brokerHost,
				brokerPort: AppConfig.broker.brokerPort,
				brokerUsername: AppConfig.broker.brokerUsername,
				brokerPassword: AppConfig.broker.brokerPassword,
			},
			[
				...AzkabanAuthTopicArray,
				...AzkabanCronjobTopicArray,
				...AzkabanEmailTopicArray,
				...AzkabanGroupTopicArray,
				...AzkabanSSETopicArray,
				...AzkabanUserTopicArray,
				...AzkabanWebhookTopicArray,
				...FoodFolioCategoryTopicArray,
				...FoodFolioCompanyTopicArray,
				...FoodFolioItemTopicArray,
				...FoodFolioItemDetailTopicArray,
				...FoodFolioItemVariantTopicArray,
				...FoodFolioLocationTopicArray,
				...FoodFolioShoppinglistTopicArray,
				...FoodFolioSizeTopicArray,
				...FoodFolioTypeTopicArray,
				...FoodFolioWarehouseTopicArray,
				...TwitchApiTopicArray,
				...TwitchBotTopicArray,
				...TwitchChannelTopicArray,
				...TwitchMessageTopicArray,
				...TwitchStreamTopicArray,
				...TwitchViewerTopicArray,
				...WarcraftApiTopicArray,
				...WarcraftCharacterTopicArray,
				...WarcraftRaiderTopicArray,
				...WarcraftAuditTopicArray,
				...CoworkingTasksTopicArray,
				...DiscordAscendApplyBotTopicArray,
				...DiscordAscendJoinBotTopicArray,
			],
			AppConfig.environment,
		),
	],
})
export class KafkaModule {}
