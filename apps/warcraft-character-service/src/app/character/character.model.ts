import { Nullable } from '@azkaban/shared';

export interface CharacterModel {
	id: string;
	region: string;
	realm: string;
	display_realm: Nullable<string>;
	name: string;
	display_name: Nullable<string>;
	gender_id: Nullable<string>;
	faction_id: Nullable<string>;
	race_id: Nullable<string>;
	class_id: Nullable<string>;
	spec_id: Nullable<string>;
	level: number;
	item_level: number;
	guild_id: Nullable<string>;
	rank_id: Nullable<number>;
	inset: Nullable<string>;
	mythic_rating: number;
	last_update: Nullable<Date>;
	last_login: Nullable<Date>;
	is_active: boolean;
	is_deleted: boolean;
	is_ascend: boolean;
	has_guild: boolean;
}

export type CharactersResponse = Array<CharacterModel>;
export type CharacterResponse = CharacterModel;
