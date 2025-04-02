import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRaceEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeRace';

	constructor(
		public readonly aggregate_id: number,
		public readonly race: Nullable<string>,
	) {}
}
