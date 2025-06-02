import { DomainEvent } from '@azkaban/shared';

export class AddWoundEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'AddWound';

	constructor(
		public readonly aggregate_id: string,
		public readonly wound: number,
		public readonly old_wound: number,
	) {}
}
