import { DomainEvent } from '@azkaban/shared';

export class ChangeMythicEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeMythic';

	constructor(
		public readonly aggregate_id: string,
		public readonly mythic: number,
		public readonly old_mythic: number,
	) {}
}
