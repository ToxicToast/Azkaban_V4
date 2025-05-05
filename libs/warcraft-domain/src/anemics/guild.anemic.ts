import { Anemic, DomainEvent, Nullable } from '@azkaban/shared';

export interface GuildAnemic extends Anemic {
	readonly guild_id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly faction: Nullable<string>;
	readonly raid: Nullable<string>;
	readonly member_count: number;
	readonly activated_at: Nullable<Date>;
}

export interface GuildAggregateAnemic {
	id: string;
	guild: GuildAnemic;
	events: Array<DomainEvent>;
}
