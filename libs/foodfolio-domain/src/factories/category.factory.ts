import { Factory, UuidHelper } from '@azkaban/shared';
import { CategoryAnemic } from '../anemics';
import { CategoryDomain } from '../domains';
import { CategoryData } from '../data';
import { CategoryAggregate } from '../aggregates';

export class CategoryFactory
	implements
		Factory<CategoryAnemic, CategoryDomain, CategoryData, CategoryAggregate>
{
	reconstitute(anemic: CategoryAnemic): CategoryAggregate {
		const {
			id,
			category_id,
			parent_id,
			title,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;
		const categoryDomain = new CategoryDomain(
			id,
			category_id,
			parent_id,
			title,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		);
		const uuid = UuidHelper.create().value;
		return new CategoryAggregate(uuid, categoryDomain);
	}

	constitute(domain: CategoryDomain): CategoryAnemic {
		return domain.toAnemic();
	}

	createDomain(data: CategoryData): CategoryAggregate {
		const { category_id, parent_id, title } = data;
		const domain = new CategoryDomain(
			0,
			category_id,
			parent_id,
			title,
			null,
			new Date(),
			null,
			null,
		);
		domain.createCategory();
		const uuid = UuidHelper.create().value;
		return new CategoryAggregate(uuid, domain);
	}
}
