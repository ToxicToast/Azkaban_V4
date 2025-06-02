import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeFactionEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeFaction';

	constructor(
		public readonly aggregate_id: string,
		public readonly faction: Nullable<string>,
		public readonly old_faction: Nullable<string>,
	) {}
}
