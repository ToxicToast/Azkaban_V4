import { DomainEvent } from '@azkaban/shared';

export class CriticalWoundEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'CriticalWound';

	constructor(
		public readonly aggregate_id: string,
		public readonly critical: number,
		public readonly old_critical: number,
	) {}
}
