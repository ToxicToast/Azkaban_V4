import { DomainEvent } from '@azkaban/shared';

export class ChangeMythicEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeMythic';

	constructor(
		public readonly aggregate_id: number,
		public readonly mythic: number,
	) {}
}
