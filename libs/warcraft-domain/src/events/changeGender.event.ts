import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeGenderEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeGender';

	constructor(
		public readonly aggregate_id: string,
		public readonly gender: Nullable<string>,
		public readonly old_gender: Nullable<string>,
	) {}
}
