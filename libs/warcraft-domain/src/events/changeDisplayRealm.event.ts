import { DomainEvent } from '@azkaban/shared';

export class ChangeDisplayRealmEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeDisplayRealm';

	constructor(
		public readonly aggregate_id: number,
		public readonly display_realm: string,
	) {}
}
