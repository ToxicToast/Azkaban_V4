import { Optional } from '@azkaban/shared';

export interface CreateCharacterDTO {
	name: string;
	role: string;
}

export interface UpdateCharacterDTO {
	current_fate?: Optional<number>;
	total_fate?: Optional<number>;
	current_wounds?: Optional<number>;
	total_wounds?: Optional<number>;
	critical_wounds?: Optional<number>;
	current_corruption?: Optional<number>;
	total_corruption?: Optional<number>;
}
