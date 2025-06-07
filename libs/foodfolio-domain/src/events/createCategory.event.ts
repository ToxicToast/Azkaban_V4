import { DomainEvent } from '@azkaban/shared';
import { CategoryAnemic } from '../anemics';

export class CreateCategoryEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Foodfolio';
	readonly event_name = 'CreateCategory';

	constructor(
		public readonly aggregate_id: string,
		public readonly category: CategoryAnemic,
	) {}
}
