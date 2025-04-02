import { Nullable, Optional } from '@azkaban/shared';

export interface CharacterData {
	readonly character_id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly rank?: Optional<number>;
}

export interface UpdataCharacterData {
	readonly id: number;
	readonly display_realm?: Optional<Nullable<string>>;
	readonly display_name?: Optional<Nullable<string>>;
	readonly gender?: Optional<Nullable<string>>;
	readonly faction?: Optional<Nullable<string>>;
	readonly race?: Optional<Nullable<string>>;
	readonly class?: Optional<Nullable<string>>;
	readonly spec?: Optional<Nullable<string>>;
	readonly level?: Optional<number>;
	readonly item_level?: Optional<number>;
	readonly guild?: Optional<Nullable<string>>;
	readonly rank?: Optional<Nullable<number>>;
	readonly inset?: Optional<Nullable<string>>;
	readonly avatar?: Optional<Nullable<string>>;
	readonly mythic?: Optional<number>;
	readonly raid?: Optional<Nullable<string>>;
	readonly loggedin_at?: Optional<Nullable<Date>>;
}
