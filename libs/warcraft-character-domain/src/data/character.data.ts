import { Optional } from '@azkaban/shared';

export interface CharacterData {
	readonly id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly rank_id?: Optional<number>;
}
