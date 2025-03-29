import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { GuildModule } from './guild/guild.module';
import { InsetModule } from './inset/inset.module';
import { MythicModule } from './mythic/mythic.module';

@Module({
	imports: [CharacterModule, GuildModule, InsetModule, MythicModule],
})
export class WarcraftModule {}
