import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeInsetEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeInset';

	constructor(
		public readonly aggregate_id: string,
		public readonly inset: Nullable<string>,
		public readonly old_inset: Nullable<string>,
	) {}
}
