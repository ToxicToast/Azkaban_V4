import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import { FoodfolioModule } from './foodfolio/foodfolio.module';
import { WarcraftModule } from './warcraft/warcraft.module';

@Module({
	imports: [GatewayModule, AzkabanModule, FoodfolioModule, WarcraftModule],
})
export class CronjobModule {}
