import { DomainEvent } from '@azkaban/shared';

export class ChangeNameEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeName';

	constructor(
		public readonly aggregate_id: string,
		public readonly name: string,
		public readonly old_name: string,
	) {}
}
