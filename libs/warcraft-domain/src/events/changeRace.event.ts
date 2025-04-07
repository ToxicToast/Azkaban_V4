import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRaceEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeRace';

	constructor(
		public readonly aggregate_id: string,
		public readonly race: Nullable<string>,
		public readonly old_race: Nullable<string>,
	) {}
}
