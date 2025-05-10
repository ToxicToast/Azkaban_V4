import { Anemic, DomainEvent, Nullable } from '@azkaban/shared';

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
	readonly activated_at: Nullable<Date>;
}

export interface CharacterAggregateAnemic {
	id: string;
	character: CharacterAnemic;
	events: Array<DomainEvent>;
}
