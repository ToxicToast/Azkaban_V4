import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRaidEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeRaid';

	constructor(
		public readonly aggregate_id: number,
		public readonly raid: Nullable<string>,
	) {}
}
