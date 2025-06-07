import { CategoryFactory } from '../factories';
import { CategoryRepository } from '../repositories';
import { CategoryAnemic } from '../anemics';
import { DomainEvent, Nullable, Optional, Result } from '@azkaban/shared';
import { CategoryData, UpdateCategoryData } from '../data';

export class CategoryService {
	private readonly factory: CategoryFactory = new CategoryFactory();

	constructor(private readonly repository: CategoryRepository) {}

	private async save(
		anemic: CategoryAnemic,
		events: Array<DomainEvent>,
	): Promise<Result<CategoryAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<CategoryAnemic>(result, events);
		} catch (error) {
			return Result.fail<CategoryAnemic>(error, 500);
		}
	}

	async getCategories(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CategoryAnemic>>> {
		try {
			const result = await this.repository.findList(
				limit,
				offset,
				withDeleted,
			);
			return Result.ok<Array<CategoryAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CategoryAnemic>>(error, 500);
		}
	}

	async getCategoryById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.repository.findById(id, withDeleted);
			if (result !== null) {
				return Result.ok<Nullable<CategoryAnemic>>(result);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				'Category not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async getCategoryByCategoryId(
		category_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.repository.findByCategoryId(
				category_id,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<CategoryAnemic>>(result);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				'Category not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async getCategoriesByParentId(
		parent_id: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CategoryAnemic>>> {
		try {
			const result = await this.repository.findByParentId(
				parent_id,
				withDeleted,
			);
			return Result.ok<Array<CategoryAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CategoryAnemic>>(error, 500);
		}
	}

	async getCategoryByTitle(
		title: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.repository.findByTitle(
				title,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<CategoryAnemic>>(result);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				'Category not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async createCategory(data: CategoryData): Promise<Result<CategoryAnemic>> {
		try {
			const categoryByTitle = await this.getCategoryByTitle(data.title);
			if (categoryByTitle.isSuccess) {
				return Result.fail<CategoryAnemic>(
					`Category with title "${data.title}" already exists`,
					400,
				);
			}
			const aggregate = this.factory.createDomain(data);
			const anemic = aggregate.toAnemic();
			const category = anemic.category;
			const events = anemic.events;
			return await this.save(category, events);
		} catch (error) {
			return Result.fail<CategoryAnemic>(error, 500);
		}
	}

	async updateCategory(
		data: UpdateCategoryData,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.getCategoryById(data.id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				const { title, parent_id } = data;
				if (title !== undefined) {
					aggregate.changeTitle(title);
				}
				if (parent_id !== undefined) {
					aggregate.changeParentId(parent_id);
				}
				const anemic = aggregate.toAnemic();
				const category = anemic.category;
				const events = anemic.events;
				return await this.save(category, events);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				result.errorValue,
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async deleteCategory(
		id: number,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.getCategoryById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteCategory();
				const anemic = aggregate.toAnemic();
				const category = anemic.category;
				const events = anemic.events;
				return await this.save(category, events);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				result.errorValue,
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async restoreCategory(
		id: number,
	): Promise<Result<Nullable<CategoryAnemic>>> {
		try {
			const result = await this.getCategoryById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreCategory();
				const anemic = aggregate.toAnemic();
				const category = anemic.category;
				const events = anemic.events;
				return await this.save(category, events);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				result.errorValue,
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async activateCategory(id: number) {
		try {
			const result = await this.getCategoryById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateCategory();
				const anemic = aggregate.toAnemic();
				const category = anemic.category;
				const events = anemic.events;
				return await this.save(category, events);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				result.errorValue,
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}

	async deactivateCategory(id: number) {
		try {
			const result = await this.getCategoryById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateCategory();
				const anemic = aggregate.toAnemic();
				const category = anemic.category;
				const events = anemic.events;
				return await this.save(category, events);
			}
			return Result.fail<Nullable<CategoryAnemic>>(
				result.errorValue,
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CategoryAnemic>>(error, 500);
		}
	}
}
