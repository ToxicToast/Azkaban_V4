import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeParentIdEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Foodfolio';
	readonly event_name = 'ChangeParentId';

	constructor(
		public readonly aggregate_id: string,
		public readonly parent_id: Nullable<string>,
		public readonly old_parent_id: Nullable<string>,
	) {}
}
