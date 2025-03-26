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
	lastUpdate: Nullable<Date>;
	lastLogin: Nullable<Date>;
	isActive: boolean;
	isDeleted: boolean;
	isAscend: boolean;
	isWithoutGuild: boolean;
}

export type CharactersResponse = Array<CharacterModel>;
export type CharacterResponse = CharacterModel;
