import { Mapper } from '@azkaban/shared';
import { CharacterDAO } from '../../dao/character.dao';
import { CharacterEntity } from '../entities';
import { CharacterFactory } from '@azkaban/warcraft-character-domain';

export class CharacterMapper implements Mapper<CharacterDAO, CharacterEntity> {
	private readonly domainFactory: CharacterFactory = new CharacterFactory();

	toEntity(data: CharacterDAO): CharacterEntity {
		const {
			id,
			region,
			realm,
			display_realm,
			name,
			display_name,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			inset,
			mythic,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new CharacterEntity();
		entity.id = id;
		entity.region = region;
		entity.realm = realm;
		entity.display_realm = display_realm;
		entity.name = name;
		entity.display_name = display_name;
		entity.gender_id = gender_id;
		entity.faction_id = faction_id;
		entity.race_id = race_id;
		entity.class_id = class_id;
		entity.spec_id = spec_id;
		entity.level = level;
		entity.item_level = item_level;
		entity.guild_id = guild_id;
		entity.rank_id = rank_id;
		entity.inset = inset;
		entity.mythic = mythic;
		entity.loggedin_at = loggedin_at;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: CharacterEntity): CharacterDAO {
		const {
			id,
			region,
			realm,
			display_realm,
			name,
			display_name,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			inset,
			mythic,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			region,
			realm,
			display_realm,
			name,
			display_name,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			inset,
			mythic,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic();
	}
}
