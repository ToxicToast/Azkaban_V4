import { Nullable } from '@azkaban/shared';

export interface CategoryDAO {
	id: number;
	category_id: string;
	parent_id: Nullable<string>;
	title: string;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
