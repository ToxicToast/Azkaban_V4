import { Nullable, Optional } from '@azkaban/shared';

export interface CategoryData {
	readonly category_id: string;
	readonly title: string;
	readonly parent_id: Nullable<string>;
}

export interface UpdateCategoryData {
	readonly id: number;
	readonly title?: Optional<string>;
	readonly parent_id?: Optional<Nullable<string>>;
}
