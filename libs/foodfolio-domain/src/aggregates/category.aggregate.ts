import { CategoryAggregateAnemic } from '../anemics';
import { CategoryDomain } from '../domains';
import { Nullable } from '@azkaban/shared';

export class CategoryAggregate {
	constructor(
		private readonly id: string,
		private readonly category: CategoryDomain,
	) {}

	toAnemic(): CategoryAggregateAnemic {
		return {
			id: this.id,
			category: this.category.toAnemic(),
			events: this.category.toEvents(),
		};
	}

	changeTitle(title: string): void {
		this.category.changeTitle(title);
	}

	changeParentId(parent_id: Nullable<string>): void {
		this.category.changeParentId(parent_id);
	}

	activateCategory(): void {
		this.category.activateCategory();
	}

	deactivateCategory(): void {
		this.category.deactivateCategory();
	}

	deleteCategory(): void {
		this.category.deleteCategory();
	}

	restoreCategory(): void {
		this.category.restoreCategory();
	}
}
