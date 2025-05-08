import { Anemic, DomainEvent } from '@azkaban/shared';

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
		critical: number;
	};
	readonly corruption: {
		current: number;
		total: number;
	};
}

export interface CharacterAggregateAnemic {
	id: string;
	character: CharacterAnemic;
	events: Array<DomainEvent>;
}
