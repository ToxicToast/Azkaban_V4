import { DomainEvent } from '@azkaban/shared';

export class ChangeLevelEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'ChangeLevel';

	constructor(
		public readonly aggregate_id: number,
		public readonly level: number,
	) {}
}
