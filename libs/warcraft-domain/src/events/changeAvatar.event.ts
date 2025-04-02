import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeAvatarEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeAvatar';

	constructor(
		public readonly aggregate_id: number,
		public readonly avatar: Nullable<string>,
	) {}
}
