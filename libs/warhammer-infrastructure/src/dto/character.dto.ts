import { Optional } from '@azkaban/shared';

export interface CreateCharacterDTO {
	name: string;
	role: string;
	fate: number;
	wounds: number;
}

export interface UpdateCharacterDTO {
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
}
