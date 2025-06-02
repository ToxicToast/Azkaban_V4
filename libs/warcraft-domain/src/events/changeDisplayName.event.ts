import { DomainEvent } from '@azkaban/shared';

export class ChangeDisplayNameEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeDisplayName';

	constructor(
		public readonly aggregate_id: string,
		public readonly display_name: string,
		public readonly old_display_name: string,
	) {}
}
