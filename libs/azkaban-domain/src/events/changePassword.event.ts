import { DomainEvent } from '@azkaban/shared';

export class ChangePasswordEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangePassword';

	constructor(
		public readonly aggregate_id: string,
		public readonly password: string,
		public readonly old_password: string,
	) {}
}
