import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { AssetsModule } from './assets/assets.module';
import { MythicModule } from './mythic/mythic.module';
import { RaidModule } from './raid/raid.module';
import { GuildModule } from './guild/guild.module';

@Module({
	imports: [
		CharacterModule,
		AssetsModule,
		MythicModule,
		RaidModule,
		GuildModule,
	],
})
export class CronjobModule {}
