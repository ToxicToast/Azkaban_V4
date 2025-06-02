import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRaidEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeRaid';

	constructor(
		public readonly aggregate_id: string,
		public readonly raid: Nullable<string>,
		public readonly old_raid: Nullable<string>,
	) {}
}
