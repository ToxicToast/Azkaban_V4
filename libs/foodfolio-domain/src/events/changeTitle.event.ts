import { DomainEvent } from '@azkaban/shared';

export class ChangeTitleEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Foodfolio';
	readonly event_name = 'ChangeTitle';

	constructor(
		public readonly aggregate_id: string,
		public readonly title: string,
		public readonly old_title: string,
	) {}
}
