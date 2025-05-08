import { DomainEvent } from '@azkaban/shared';

export class CriticalWoundEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'CriticalWound';

	constructor(public readonly aggregate_id: string) {}
}
