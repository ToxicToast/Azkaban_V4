import { Inject, Injectable } from '@nestjs/common';
import {
	CategoryDAO,
	CategoryEntity,
	CategoryRepository,
	CategoryService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Span } from 'nestjs-otel';
import { FoodFolioCategoryTopics } from '@azkaban/shared';
import { CategoryList } from '../../utils/dtos';

@Injectable()
export class CategoryService {
	private readonly infrastructureRepository: CategoryRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		// private readonly cache: CategoryCache,
		@Inject('CATEGORY_REPOSITORY')
		private readonly categoryRepository: Repository<CategoryEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.infrastructureRepository = new CategoryRepository(
			this.categoryRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
			this.eventEmitter,
		);
	}

	@Span(FoodFolioCategoryTopics.LIST + '.service')
	async categoryList(data: CategoryList): Promise<Array<CategoryDAO>> {
		const categories = await this.infrastructureService.getCategoryList(
			data.limit,
			data.offset,
			data.withDeleted,
		);
		// await this.cache.cacheCategoryList(categories, data.limit, data.offset, data.withDeleted);
		return categories;
	}
}
