import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import { FoodfolioModule } from './foodfolio/foodfolio.module';

@Module({
	imports: [GatewayModule, AzkabanModule, FoodfolioModule],
})
export class CronjobModule {}
