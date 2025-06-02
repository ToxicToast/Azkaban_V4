import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeLoggedInEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeLoggedIn';

	constructor(
		public readonly aggregate_id: string,
		public readonly loggedin_at: Nullable<Date>,
		public readonly old_loggedin_at: Nullable<Date>,
	) {}
}
