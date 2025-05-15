import { Nullable, Optional } from '@azkaban/shared';

export interface CharacterList {
	limit?: Optional<number>;
	offset?: Optional<number>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByIdDTO {
	id: number;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByCharacterIdDTO {
	character_id: string;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByGuildDTO {
	guild: Nullable<string>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByClassDTO {
	character_class: Nullable<string>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByRaceDTO {
	race: Nullable<string>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByFactionDTO {
	faction: Nullable<string>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterCreateDTO {
	region: string;
	realm: string;
	name: string;
	rank?: Optional<Nullable<number>>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterUpdateDTO {
	id: number;
	data?: {
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
		rank?: Optional<Nullable<number>>;
		inset?: Optional<Nullable<string>>;
		avatar?: Optional<Nullable<string>>;
		mythic?: Optional<number>;
		raid?: Optional<Nullable<string>>;
		loggedin_at?: Optional<Nullable<Date>>;
	};
}
