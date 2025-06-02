import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { CategoryAnemic } from '../anemics';

export class CategoryDomain
	extends AggregateRoot
	implements Domain<CategoryAnemic>
{
	constructor(
		private readonly id: number,
		private readonly category_id: string,
		private parent_id: Nullable<string>,
		private title: string,
		private activated_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {
		super();
	}

	toAnemic(): CategoryAnemic {
		return {
			id: this.id,
			category_id: this.category_id,
			parent_id: this.parent_id,
			title: this.title,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	createCategory(): void {
		// Add Domain Event for creating a category
	}

	changeTitle(title: string): void {
		if (title !== this.title) {
			this.updated_at = new Date();
			this.title = title;
			// Add Domain Event for changing the title
		}
	}

	activateCategory(): void {
		if (this.activated_at === null) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	deactivateCategory(): void {
		if (this.activated_at !== null) {
			this.updated_at = new Date();
			this.activated_at = null;
		}
	}

	deleteCategory(): void {
		if (this.deleted_at === null) {
			this.updated_at = new Date();
			this.deleted_at = new Date();
		}
	}

	restoreCategory(): void {
		if (this.deleted_at !== null) {
			this.updated_at = new Date();
			this.deleted_at = null;
		}
	}
}
