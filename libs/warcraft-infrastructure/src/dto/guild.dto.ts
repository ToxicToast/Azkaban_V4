import { Optional } from '@azkaban/shared';

export interface CreateGuildDTO {
	region: string;
	realm: string;
	name: string;
	rank?: Optional<number>;
}
