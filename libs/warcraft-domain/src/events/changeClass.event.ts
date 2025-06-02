import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeClassEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeClass';

	constructor(
		public readonly aggregate_id: string,
		public readonly character_class: Nullable<string>,
		public readonly old_character_class: Nullable<string>,
	) {}
}
