import { DomainEvent } from '@azkaban/shared';

export class ChangeLevelEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'ChangeLevel';

	constructor(
		public readonly aggregate_id: string,
		public readonly level: number,
		public readonly old_level: number,
	) {}
}
