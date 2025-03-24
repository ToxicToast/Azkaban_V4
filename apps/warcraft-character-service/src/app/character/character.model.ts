import { Nullable } from '@azkaban/shared';

export interface CharacterModel {
	id: string;
	region: string;
	realm: string;
	name: string;
	gender: Nullable<string>;
	faction: Nullable<string>;
	race: Nullable<string>;
	class: Nullable<string>;
	spec: Nullable<string>;
	level: number;
	itemLevel: number;
	guild: Nullable<string>;
	rank: Nullable<string>;
	lastUpdate: Nullable<Date>;
	isActive: boolean;
	isDeleted: boolean;
	isAscend: boolean;
}

export type CharactersResponse = Array<CharacterModel>;
export type CharacterResponse = CharacterModel;
