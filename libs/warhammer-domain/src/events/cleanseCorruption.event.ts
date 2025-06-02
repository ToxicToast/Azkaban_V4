import { DomainEvent } from '@azkaban/shared';

export class CleanseCorruptionEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'CleanseCorruption';

	constructor(
		public readonly aggregate_id: string,
		public readonly corruption: number,
		public readonly old_corruption: number,
	) {}
}
