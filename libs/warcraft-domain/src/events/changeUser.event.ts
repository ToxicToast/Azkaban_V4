import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeUserEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeWarcraftUser';

	constructor(
		public readonly aggregate_id: string,
		public readonly user_id: Nullable<string>,
		public readonly old_user_id: Nullable<string>,
	) {}
}
