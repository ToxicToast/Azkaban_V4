import { DomainEvent } from '@azkaban/shared';

export class ChangeItemLevelEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeItemLevel';

	constructor(
		public readonly aggregate_id: string,
		public readonly item_level: number,
		public readonly old_item_level: number,
	) {}
}
