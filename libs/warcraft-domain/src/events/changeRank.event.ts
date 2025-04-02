import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeRankEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeRank';

	constructor(
		public readonly aggregate_id: number,
		public readonly rank: Nullable<number>,
	) {}
}
