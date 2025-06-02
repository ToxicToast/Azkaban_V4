import { DomainEvent } from '@azkaban/shared';
import { UserAnemic } from '../anemics';

export class CreateUserEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Azkaban';
	readonly event_name = 'CreateUser';

	constructor(
		public readonly aggregate_id: string,
		public readonly user: UserAnemic,
	) {}
}
