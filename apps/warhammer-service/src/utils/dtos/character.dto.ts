import { Optional } from '@azkaban/shared';

export interface CharacterList {
	limit?: Optional<number>;
	offset?: Optional<number>;
	withDeleted?: Optional<boolean>;
}

export interface CharacterById {
	id: number;
	withDeleted?: Optional<boolean>;
}

export interface CharacterByCharacterId {
	character_id: string;
	withDeleted?: Optional<boolean>;
}
