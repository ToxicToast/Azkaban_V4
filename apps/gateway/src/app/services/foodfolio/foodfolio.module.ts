import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { ItemModule } from './item/item.module';
import { ItemDetailModule } from './itemdetail/itemdetail.module';
import { ItemVariantModule } from './itemvariant/itemvariant.module';
import { LocationModule } from './location/location.module';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';
import { SizeModule } from './size/size.module';
import { TypeModule } from './type/type.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
	imports: [
		CategoryModule,
		CompanyModule,
		ItemModule,
		ItemDetailModule,
		ItemVariantModule,
		LocationModule,
		ShoppinglistModule,
		SizeModule,
		TypeModule,
		WarehouseModule,
	],
})
export class FoodfolioModule {}
