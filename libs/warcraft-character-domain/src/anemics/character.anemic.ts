import { Anemic, Nullable } from '@azkaban/shared';

export interface CharacterAnemic extends Anemic {
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly gender_id: Nullable<number>;
	readonly faction_id: Nullable<number>;
	readonly race_id: Nullable<number>;
	readonly class_id: Nullable<number>;
	readonly spec_id: Nullable<number>;
	readonly level: Nullable<number>;
	readonly item_level: Nullable<number>;
	readonly guild_id: Nullable<number>;
	readonly rank_id: Nullable<number>;
}
