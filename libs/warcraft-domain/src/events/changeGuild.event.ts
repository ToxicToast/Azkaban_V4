import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeGuildEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeGuild';

	constructor(
		public readonly aggregate_id: number,
		public readonly guild: Nullable<string>,
	) {}
}
