import { Nullable } from '@azkaban/shared';

export interface CharacterModel {
	id: number;
	character_id: string;
	region: string;
	realm: string;
	name: string;
	display_realm: Nullable<string>;
	display_name: Nullable<string>;
	gender: Nullable<string>;
	faction: Nullable<string>;
	race: Nullable<string>;
	class: Nullable<string>;
	spec: Nullable<string>;
	level: number;
	item_level: number;
	guild: Nullable<string>;
	rank: Nullable<number>;
	inset: Nullable<string>;
	avatar: Nullable<string>;
	mythic: number;
	raid: Nullable<string>;
	activated_at: Nullable<Date>;
	loggedin_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
