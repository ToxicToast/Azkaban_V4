import { DomainEvent } from '@azkaban/shared';

export class ChangeSaltEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeSalt';

	constructor(
		public readonly aggregate_id: string,
		public readonly salt: string,
		public readonly old_salt: string,
	) {}
}
