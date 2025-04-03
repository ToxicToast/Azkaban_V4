import { Anemic, Nullable } from '@azkaban/shared';

export interface CharacterAnemic extends Anemic {
	readonly character_id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly display_realm: Nullable<string>;
	readonly display_name: Nullable<string>;
	readonly gender: Nullable<string>;
	readonly faction: Nullable<string>;
	readonly race: Nullable<string>;
	readonly class: Nullable<string>;
	readonly spec: Nullable<string>;
	readonly level: number;
	readonly item_level: number;
	readonly guild: Nullable<string>;
	readonly rank: Nullable<number>;
	readonly old_guild: Nullable<string>;
	readonly inset: Nullable<string>;
	readonly avatar: Nullable<string>;
	readonly mythic: number;
	readonly raid: Nullable<string>;
	readonly activated_at: Nullable<Date>;
	readonly loggedin_at: Nullable<Date>;
}

export interface CharacterAggregateAnemic {
	id: string;
	character: CharacterAnemic;
}
