import { DomainEvent } from '@azkaban/shared';

export class HealWoundEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'HealWound';

	constructor(
		public readonly aggregate_id: string,
		public readonly wound: number,
		public readonly old_wound: number,
	) {}
}
