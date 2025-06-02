import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeAvatarEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeAvatar';

	constructor(
		public readonly aggregate_id: string,
		public readonly avatar: Nullable<string>,
		public readonly old_avatar: Nullable<string>,
	) {}
}
