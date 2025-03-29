import { Nullable } from '@azkaban/shared';

export interface CharacterModel {
	id: string;
	region: string;
	realm: string;
	name: string;
	gender_id: Nullable<number>;
	faction_id: Nullable<number>;
	race_id: Nullable<number>;
	class_id: Nullable<number>;
	spec_id: Nullable<number>;
	level: number;
	item_level: number;
	guild_id: Nullable<number>;
	rank_id: Nullable<number>;
	lastUpdate: Nullable<Date>;
	isActive: boolean;
	isDeleted: boolean;
	isAscend: boolean;
	isWithoutGuild: boolean;
}
