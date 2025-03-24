import { Nullable } from '@azkaban/shared';
import { CharacterModel } from './character.model';
import { Logger } from '@nestjs/common';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

export class CharacterPresenter {
	constructor(private readonly character: Nullable<CharacterDAO>) {}

	public transform(): CharacterModel {
		Logger.debug(
			{ character: this.character },
			CharacterPresenter.name,
			'transform',
		);
		if (this.character !== null) {
			return {
				id: this.character.id,
				region: this.character.region,
				realm: this.character.realm,
				name: this.character.name,
				gender_id: this.character.gender_id,
				faction_id: this.character.faction_id,
				race_id: this.character.race_id,
				class_id: this.character.class_id,
				spec_id: this.character.spec_id,
				level: this.character.level,
				item_level: this.character.item_level,
				guild_id: this.character.guild_id,
				rank_id: this.character.rank_id,
				lastUpdate: this.character.updated_at,
				isActive: !!this.character.activated_at,
				isDeleted: !!this.character.deleted_at,
				isAscend: false,
			};
		}
		return null;
	}
}
