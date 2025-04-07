import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { AssetsModule } from './assets/assets.module';

@Module({
	imports: [CharacterModule, AssetsModule],
})
export class CronjobModule {}
