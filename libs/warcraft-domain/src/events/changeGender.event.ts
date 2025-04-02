import { DomainEvent, Nullable } from '@azkaban/shared';

export class ChangeGenderEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeGender';

	constructor(
		public readonly aggregate_id: number,
		public readonly gender: Nullable<string>,
	) {}
}
