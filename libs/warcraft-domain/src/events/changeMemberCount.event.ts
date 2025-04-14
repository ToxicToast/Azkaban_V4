import { DomainEvent } from '@azkaban/shared';

export class ChangeMemberCountEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeMemberCount';

	constructor(
		public readonly aggregate_id: string,
		public readonly member_count: number,
		public readonly old_member_count: number,
	) {}
}
