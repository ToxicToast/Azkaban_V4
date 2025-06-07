import { Chainable, Nullable, Optional, Repository } from '@azkaban/shared';
import { CategoryAnemic } from '../anemics';

interface AdditionalMethods {
	findByCategoryId(
		category_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<CategoryAnemic>>;
	findByParentId(
		parent_id: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CategoryAnemic>>;
	findByTitle(
		title: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<CategoryAnemic>>;
}

export type CategoryRepository = Chainable<
	Repository<CategoryAnemic>,
	AdditionalMethods
>;
