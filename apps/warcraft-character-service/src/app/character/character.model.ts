export interface CharacterModel {
	id: string;
	region: string;
	realm: string;
	name: string;
	isActive: boolean;
	isDeleted: boolean;
}

export type CharactersResponse = Array<CharacterModel>;
export type CharacterResponse = CharacterModel;
