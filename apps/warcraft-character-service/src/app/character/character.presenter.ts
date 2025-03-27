import { Nullable } from '@azkaban/shared';
import { CharacterModel } from './character.model';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

export class CharacterPresenter {
	constructor(private readonly character: Nullable<CharacterDAO>) {}

	public transform(): CharacterModel {
		if (this.character !== null) {
			return {
				id: this.character.id,
				region: this.character.region,
				realm: this.character.realm,
				display_realm: this.character.display_realm,
				name: this.character.name,
				display_name: this.character.display_name,
				gender_id: this.character.gender_id,
				faction_id: this.character.faction_id,
				race_id: this.character.race_id,
				class_id: this.character.class_id,
				spec_id: this.character.spec_id,
				level: this.character.level,
				item_level: this.character.item_level,
				guild_id: this.character.guild_id,
				rank_id: this.character.rank_id,
				inset: this.character.inset,
				mythic_rating: this.character.mythic,
				last_update: this.character.updated_at,
				last_login: this.character.loggedin_at,
				is_active: !!this.character.activated_at,
				is_deleted: !!this.character.deleted_at,
				is_ascend: this.character.guild_id === 'Ascend',
				has_guild: this.character.guild_id !== null,
			};
		}
		return null;
	}
}
