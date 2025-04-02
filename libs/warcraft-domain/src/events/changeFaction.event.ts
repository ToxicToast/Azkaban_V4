import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeFactionEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeFaction';

	constructor(
		public readonly aggregate_id: number,
		public readonly faction: Nullable<string>,
	) {}
}
