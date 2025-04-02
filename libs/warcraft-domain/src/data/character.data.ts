import { Optional } from '@azkaban/shared';

export interface CharacterData {
	readonly character_id: string;
	readonly region: string;
	readonly realm: string;
	readonly name: string;
	readonly rank?: Optional<number>;
}
