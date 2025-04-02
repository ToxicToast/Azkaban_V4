import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeSpecEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeSpec';

	constructor(
		public readonly aggregate_id: number,
		public readonly spec: Nullable<string>,
	) {}
}
