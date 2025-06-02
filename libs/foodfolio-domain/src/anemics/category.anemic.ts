import { Anemic, DomainEvent, Nullable } from '@azkaban/shared';

export interface CategoryAnemic extends Anemic {
	readonly category_id: string;
	readonly parent_id: Nullable<string>;
	readonly title: string;
	readonly activated_at: Nullable<Date>;
}

export interface CategoryAggregateAnemic {
	id: string;
	category: CategoryAnemic;
	events: Array<DomainEvent>;
}
