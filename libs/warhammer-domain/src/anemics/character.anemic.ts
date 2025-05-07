import { Anemic } from '@azkaban/shared';

export interface CharacterAnemic extends Anemic {
	readonly character_id: string;
	readonly name: string;
	readonly role: string;
	readonly fate: {
		current: number;
		total: number;
	};
	readonly wounds: {
		current: number;
		total: number;
	};
}
