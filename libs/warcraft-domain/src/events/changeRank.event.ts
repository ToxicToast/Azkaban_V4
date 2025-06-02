import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRankEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeRank';

	constructor(
		public readonly aggregate_id: string,
		public readonly rank: Nullable<number>,
		public readonly old_rank: Nullable<number>,
	) {}
}
