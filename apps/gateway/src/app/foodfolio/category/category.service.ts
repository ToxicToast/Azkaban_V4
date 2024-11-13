import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CategoryService implements OnModuleInit, OnModuleDestroy {
	constructor() {}

	async onModuleInit(): Promise<void> {
		//
	}

	async onModuleDestroy(): Promise<void> {
		//
	}

	async getCategories() {
		return null;
	}

	async getCategoryByParentId(id: string) {
		return null;
	}

	async getCategoryById(id: string) {
		return null;
	}

	async createCategory(title: string, parent_id?: string) {
		return null;
	}

	async updateCategory(
		id: string,
		title?: Optional<string>,
		parent_id?: Optional<string>,
		activated_at?: Optional<Date>,
	) {
		return null;
	}

	async deleteCategory(id: string) {
		return null;
	}

	async restoreCategory(id: string) {
		return null;
	}
}
