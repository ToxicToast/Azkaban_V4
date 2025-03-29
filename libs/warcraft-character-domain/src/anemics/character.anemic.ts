import { Anemic, Nullable } from '@azkaban/shared';

export interface CharacterAnemic extends Anemic {
	readonly region: string;
	readonly realm: string;
	readonly display_realm: Nullable<string>;
	readonly name: string;
	readonly display_name: Nullable<string>;
	readonly gender_id: Nullable<string>;
	readonly faction_id: Nullable<string>;
	readonly race_id: Nullable<string>;
	readonly class_id: Nullable<string>;
	readonly spec_id: Nullable<string>;
	readonly level: Nullable<number>;
	readonly item_level: Nullable<number>;
	readonly guild_id: Nullable<string>;
	readonly rank_id: Nullable<number>;
	readonly inset: Nullable<string>;
	readonly mythic: number;
	readonly activated_at: Nullable<Date>;
	readonly loggedin_at: Nullable<Date>;
}
