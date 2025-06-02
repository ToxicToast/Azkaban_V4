import { DomainEvent } from '@azkaban/shared';

export class ChangeUsernameEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Azkaban';
	readonly event_name = 'ChangeUsername';

	constructor(
		public readonly aggregate_id: string,
		public readonly username: string,
		public readonly old_username: string,
	) {}
}
