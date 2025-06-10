import { Nullable, Optional } from '@azkaban/shared';

export interface CreateCategoryDTO {
	title: string;
	parent_id: Nullable<string>;
}

export interface UpdateCategoryDTO {
	title?: Optional<string>;
	parent_id?: Optional<Nullable<string>>;
}
