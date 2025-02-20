import { Module } from '@nestjs/common';
import { ItemDetailModule } from './itemdetail/itemdetail.module';
import { ItemModule } from './item/item.module';

@Module({
	imports: [ItemModule, ItemDetailModule],
})
export class FoodfolioModule {}
