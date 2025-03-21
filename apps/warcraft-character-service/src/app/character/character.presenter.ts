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
				isActive: false,
				isDeleted: true,
			};
		}
		return null;
	}
}
