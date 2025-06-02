import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeGuildEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeGuild';

	constructor(
		public readonly aggregate_id: string,
		public readonly guild: Nullable<string>,
		public readonly old_guild: Nullable<string>,
	) {}
}
