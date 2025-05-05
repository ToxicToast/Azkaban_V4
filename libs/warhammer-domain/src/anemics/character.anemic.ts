import { Anemic } from '@azkaban/shared';

export interface CharacterAnemic extends Anemic {
	readonly character_id: string;
	readonly name: string;
}
