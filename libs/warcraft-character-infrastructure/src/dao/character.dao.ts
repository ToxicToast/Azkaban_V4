import { Nullable } from '@azkaban/shared';

export interface CharacterDAO {
	id: string;
	region: string;
	realm: string;
	name: string;
	gender_id: Nullable<number>;
	faction_id: Nullable<number>;
	race_id: Nullable<number>;
	class_id: Nullable<number>;
	spec_id: Nullable<number>;
	level: Nullable<number>;
	item_level: Nullable<number>;
	guild_id: Nullable<number>;
	rank_id: Nullable<number>;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
