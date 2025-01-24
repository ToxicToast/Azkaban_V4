import { Injectable } from '@nestjs/common';
import {
	FoodFolioCategoryTopics,
	FoodFolioCompanyTopics,
	FoodFolioItemDetailTopics,
	FoodFolioItemTopics,
	FoodFolioItemVariantTopics,
	FoodFolioLocationTopics,
	FoodFolioShoppinglistTopics,
	FoodFolioSizeTopics,
	FoodFolioTypeTopics,
	FoodFolioWarehouseTopics,
	VersionCache,
} from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class FoodfolioVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async getFoodFolioCategoryVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioCategoryTopics.VERSION,
				VersionCache.FOODFOLIOCATEGORY,
			),
		);
	}

	private async getFoodFolioCompanyVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioCompanyTopics.VERSION,
				VersionCache.FOODFOLIOCOMPANY,
			),
		);
	}

	private async getFoodFolioLocationVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioLocationTopics.VERSION,
				VersionCache.FOODFOLIOLOCATION,
			),
		);
	}

	private async getFoodFolioSizeVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioSizeTopics.VERSION,
				VersionCache.FOODFOLIOSIZE,
			),
		);
	}

	private async getFoodFolioTypeVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioTypeTopics.VERSION,
				VersionCache.FOODFOLIOTYPE,
			),
		);
	}

	private async getFoodFolioItemVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioItemTopics.VERSION,
				VersionCache.FOODFOLIOITEM,
			),
		);
	}

	private async getFoodFolioItemDetailVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioItemDetailTopics.VERSION,
				VersionCache.FOODFOLIOITEMDETAIL,
			),
		);
	}

	private async getFoodFolioItemVariantVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioItemVariantTopics.VERSION,
				VersionCache.FOODFOLIOITEMVARIANT,
			),
		);
	}

	private async getFoodFolioWarehouseVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioWarehouseTopics.VERSION,
				VersionCache.FOODFOLIOWAREHOUSE,
			),
		);
	}

	private async getFoodFolioShoppingListVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				FoodFolioShoppinglistTopics.VERSION,
				VersionCache.FOODFOLIOSHOPPINGLIST,
			),
		);
	}

	async getVersions() {
		const category = await this.getFoodFolioCategoryVersion();
		const company = await this.getFoodFolioCompanyVersion();
		const location = await this.getFoodFolioLocationVersion();
		const type = await this.getFoodFolioTypeVersion();
		const size = await this.getFoodFolioSizeVersion();
		const item = await this.getFoodFolioItemVersion();
		const itemvariant = await this.getFoodFolioItemVariantVersion();
		const itemdetail = await this.getFoodFolioItemDetailVersion();
		const warehouse = await this.getFoodFolioWarehouseVersion();
		const shoppinglist = await this.getFoodFolioShoppingListVersion();
		//
		return {
			category,
			company,
			location,
			type,
			size,
			item,
			itemvariant,
			itemdetail,
			warehouse,
			shoppinglist,
		};
	}
}
