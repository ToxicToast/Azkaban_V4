import { Nullable } from '@azkaban/shared';
import { CharacterModel } from './character.model';

export class CharacterPresenter {
	constructor(private readonly character: Nullable<unknown>) {}

	public transform(): CharacterModel {
		if (this.character !== null) {
			return {
				id: 'id',
				region: 'region',
				realm: 'realm',
				name: 'name',
				gender: null,
				faction: null,
				race: null,
				class: null,
				spec: null,
				level: 0,
				itemLevel: 0,
				guild: null,
				rank: null,
				isActive: false,
				isDeleted: true,
				isAscend: false,
			};
		}
		return null;
	}
}
