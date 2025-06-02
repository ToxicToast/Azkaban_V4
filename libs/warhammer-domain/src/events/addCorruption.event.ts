import { DomainEvent } from '@azkaban/shared';

export class AddCorruptionEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'AddCorruption';

	constructor(
		public readonly aggregate_id: string,
		public readonly corruption: number,
		public readonly old_corruption: number,
	) {}
}
