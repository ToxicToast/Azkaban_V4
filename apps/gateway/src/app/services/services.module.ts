import { Module } from '@nestjs/common';
import { VersionModule } from './version/version.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import { FoodfolioModule } from './foodfolio/foodfolio.module';
import { TwitchModule } from './twitch/twitch.module';
import { WarcraftModule } from './warcraft/warcraft.module';
import { CoworkingModule } from './coworking/coworking.module';
import { DiscordModule } from './discord/discord.module';

@Module({
	imports: [
		VersionModule,
		AzkabanModule,
		FoodfolioModule,
		TwitchModule,
		WarcraftModule,
		CoworkingModule,
		DiscordModule,
	],
})
export class ServicesModule {}
