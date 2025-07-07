import { Nullable, Optional } from '@azkaban/shared';

export interface CategoryList {
	limit?: Optional<number>;
	offset?: Optional<number>;
	withDeleted?: Optional<boolean>;
}

export interface CategoryById {
	id: number;
	withDeleted?: Optional<boolean>;
}

export interface CategoryByCategoryId {
	category_id: string;
	withDeleted?: Optional<boolean>;
}

export interface CategoryCreate {
	data: {
		title: string;
		parent_id?: Optional<Nullable<string>>;
	};
}

export interface CategoryUpdate {
	id: number;
	data?: Optional<{
		title?: Optional<string>;
		parent_id?: Optional<Nullable<string>>;
	}>;
}
