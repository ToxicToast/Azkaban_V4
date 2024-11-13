import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { CategoryService } from './category.service';

@Controller('foodfolio/category')
export class CategoryController {
	constructor(private readonly service: CategoryService) {}

	@Get()
	async getCategories() {
		return await this.service.getCategories();
	}

	@Get(':id')
	async getCategoryById(@Param('id') id: string) {
		return await this.service.getCategoryById(id);
	}

	@Get(':id/parent')
	async getCategoryParents(@Param('id') id: string) {
		return await this.service.getCategoryByParentId(id);
	}

	@Post()
	async createCategory(
		@Body('title') title: string,
		@Body('parent_id') parent_id?: Optional<Nullable<string>>,
	) {
		return await this.service.createCategory(title, parent_id);
	}

	@Put(':id')
	async updateCategory(
		@Param('id') id: string,
		@Body('title') title?: Optional<string>,
		@Body('parent_id') parent_id?: Optional<Nullable<string>>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
	) {
		return await this.service.updateCategory(
			id,
			title,
			parent_id,
			activated_at,
		);
	}

	@Delete(':id')
	async deleteCategory(@Param('id') id: string) {
		return await this.service.deleteCategory(id);
	}

	@Put(':id/restore')
	async restoreCategory(@Param('id') id: string) {
		return await this.service.restoreCategory(id);
	}
}
