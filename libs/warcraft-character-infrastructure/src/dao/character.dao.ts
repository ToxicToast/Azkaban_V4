import { Nullable } from '@azkaban/shared';

export interface CharacterDAO {
	id: string;
	region: string;
	realm: string;
	name: string;
	display_realm: Nullable<string>;
	display_name: Nullable<string>;
	gender_id: Nullable<string>;
	faction_id: Nullable<string>;
	race_id: Nullable<string>;
	class_id: Nullable<string>;
	spec_id: Nullable<string>;
	level: Nullable<number>;
	item_level: Nullable<number>;
	guild_id: Nullable<string>;
	rank_id: Nullable<number>;
	inset: Nullable<string>;
	loggedin_at: Nullable<Date>;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
