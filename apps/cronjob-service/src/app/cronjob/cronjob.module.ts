import { Module } from '@nestjs/common';
import { AzkabanModule } from './azkaban/azkaban.module';
import { FoodfolioModule } from './foodfolio/foodfolio.module';

@Module({
	imports: [AzkabanModule, FoodfolioModule],
})
export class CronjobModule {}
