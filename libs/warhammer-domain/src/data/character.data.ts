import { Optional } from '@azkaban/shared';

export interface CharacterData {
	readonly character_id: string;
	readonly name: string;
	readonly role: string;
}

export interface UpdateCharacterData {
	readonly id: number;
	readonly current_fate?: Optional<number>;
	readonly current_fate_type?: 'fated' | 'use';
	readonly current_wounds?: Optional<number>;
	readonly current_wounds_type?: 'heal' | 'inflict';
	readonly current_corruption?: Optional<number>;
	readonly current_corruption_type?: 'corrupt' | 'cleanse';
}
