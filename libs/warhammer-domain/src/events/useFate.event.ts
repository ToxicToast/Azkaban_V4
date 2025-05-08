import { DomainEvent } from '@azkaban/shared';

export class UseFateEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'UseFate';

	constructor(
		public readonly aggregate_id: string,
		public readonly fate: number,
		public readonly old_fate: number,
	) {}
}
