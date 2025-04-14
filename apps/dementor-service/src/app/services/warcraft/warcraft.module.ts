import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { GuildModule } from './guild/guild.module';

@Module({
	imports: [CharacterModule, GuildModule],
})
export class WarcraftModule {}
