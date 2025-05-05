import { Nullable, Optional } from '@azkaban/shared';

export interface GuildData {
	readonly guild_id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
}

export interface UpdateGuildData {
	readonly id: number;
	readonly faction?: Optional<Nullable<string>>;
	readonly member_count?: Optional<number>;
	readonly raid?: Optional<Nullable<string>>;
}
