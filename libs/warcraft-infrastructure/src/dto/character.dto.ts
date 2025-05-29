import { Nullable, Optional } from '@azkaban/shared';

export interface CreateCharacterDTO {
	region: string;
	realm: string;
	name: string;
	rank?: Optional<number>;
}

export interface UpdateCharacterDTO {
	display_realm?: Optional<Nullable<string>>;
	display_name?: Optional<Nullable<string>>;
	gender?: Optional<Nullable<string>>;
	faction?: Optional<Nullable<string>>;
	race?: Optional<Nullable<string>>;
	class?: Optional<Nullable<string>>;
	spec?: Optional<Nullable<string>>;
	level?: Optional<number>;
	item_level?: Optional<number>;
	guild?: Optional<Nullable<string>>;
	rank?: Optional<number>;
	inset?: Optional<Nullable<string>>;
	avatar?: Optional<Nullable<string>>;
	mythic?: Optional<number>;
	raid?: Optional<Nullable<string>>;
	loggedin_at?: Optional<Nullable<Date>>;
}

export interface AssignCharacterDTO {
	user_id: Nullable<string>;
}
