import { Optional } from '@azkaban/shared';

export interface CharacterData {
	readonly character_id: string;
	readonly name: string;
	readonly role: string;
	readonly fate: number;
	readonly wounds: number;
}

export interface UpdateCharacterData {
	readonly id: number;
	readonly fate?: Optional<{
		type: 'fated' | 'use';
		fate: number;
	}>;
	readonly total_fate?: Optional<number>;
	readonly wounds?: Optional<{
		type: 'heal' | 'inflict';
		wounds: number;
	}>;
	readonly total_wounds?: Optional<number>;
	readonly corruption?: Optional<{
		type: 'corrupt' | 'cleanse';
		corruption: number;
	}>;
}
