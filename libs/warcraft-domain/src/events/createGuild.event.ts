import { DomainEvent } from '@azkaban/shared';
import { GuildAnemic } from '../anemics';

export class CreateGuildEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warcraft';
	readonly event_name = 'CreateGuild';

	constructor(
		public readonly aggregate_id: string,
		public readonly guild: GuildAnemic,
	) {}
}
