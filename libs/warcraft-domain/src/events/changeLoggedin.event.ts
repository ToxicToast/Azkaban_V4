import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeLoggedInEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeLoggedIn';

	constructor(
		public readonly aggregate_id: number,
		public readonly loggedin_at: Nullable<Date>,
	) {}
}
