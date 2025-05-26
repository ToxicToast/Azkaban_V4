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
	wounds?: Optional<{
		type: 'heal' | 'inflict';
		wounds: number;
	}>;
	corruption?: Optional<{
		type: 'corrupt' | 'cleanse';
		corruption: number;
	}>;
}
