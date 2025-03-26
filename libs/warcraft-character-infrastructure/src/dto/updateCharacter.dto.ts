import { Nullable, Optional } from '@azkaban/shared';

export interface UpdateCharacterDTO {
	region?: Optional<string>;
	realm?: Optional<string>;
	name?: Optional<string>;
	display_realm?: Optional<string>;
	display_name?: Optional<string>;
	gender_id?: Optional<Nullable<string>>;
	faction_id?: Optional<Nullable<string>>;
	race_id?: Optional<Nullable<string>>;
	class_id?: Optional<Nullable<string>>;
	spec_id?: Optional<Nullable<string>>;
	level?: Optional<number>;
	item_level?: Optional<number>;
	guild_id?: Optional<Nullable<string>>;
	rank_id?: Optional<number>;
	mythic?: Optional<number>;
	inset?: Optional<Nullable<string>>;
}
