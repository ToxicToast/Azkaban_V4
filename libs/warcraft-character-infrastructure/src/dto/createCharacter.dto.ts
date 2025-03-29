import { Optional } from '@azkaban/shared';

export interface CreateCharacterDTO {
	region: string;
	realm: string;
	name: string;
	rank_id?: Optional<number>;
}
