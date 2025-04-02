import { DomainEvent } from '@azkaban/shared';

export class ChangeDisplayNameEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeDisplayName';

	constructor(
		public readonly aggregate_id: number,
		public readonly display_name: string,
	) {}
}
