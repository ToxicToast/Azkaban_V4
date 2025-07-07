import { Module } from '@nestjs/common';
import { WarcraftModule } from './warcraft/warcraft.module';
import { WarhammerModule } from './warhammer/warhammer.module';
import { VersionModule } from './version/version.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import { FoodfolioModule } from './foodfolio/foodfolio.module';

@Module({
	imports: [
		AzkabanModule,
		WarcraftModule,
		WarhammerModule,
		FoodfolioModule,
		VersionModule,
	],
})
export class ServicesModule {}
