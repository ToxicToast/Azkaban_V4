import { DomainEvent } from '@azkaban/shared';

export class ChangeEmailEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Azkaban';
	readonly event_name = 'ChangeEmail';

	constructor(
		public readonly aggregate_id: string,
		public readonly email: string,
		public readonly old_email: string,
	) {}
}
