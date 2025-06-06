import { Nullable, Optional } from '@azkaban/shared';

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

export interface CharacterCreate {
	data: {
		name: string;
		role: string;
		fate: number;
		wounds: number;
	};
}

export interface CharacterUpdate {
	id: number;
	data?: Optional<{
		fate?: Optional<{
			type: 'fated' | 'use';
			fate: number;
		}>;
		total_fate?: Optional<number>;
		wounds?: Optional<{
			type: 'heal' | 'inflict';
			wounds: number;
		}>;
		total_wounds?: Optional<number>;
		corruption?: Optional<{
			type: 'corrupt' | 'cleanse';
			corruption: number;
		}>;
	}>;
}

export interface CharacterAssign {
	id: number;
	user_id: Nullable<string>;
}
