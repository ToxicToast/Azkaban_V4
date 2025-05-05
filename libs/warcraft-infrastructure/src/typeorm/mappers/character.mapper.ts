import { Mapper } from '@azkaban/shared';
import { CharacterEntity } from '../entities';
import { CharacterDAO } from '../../dao';
import { CharacterFactory } from '@azkaban/warcraft-domain';

export class CharacterMapper implements Mapper<CharacterDAO, CharacterEntity> {
	private readonly domainFactory: CharacterFactory = new CharacterFactory();

	toEntity(data: CharacterDAO): CharacterEntity {
		const {
			id,
			character_id,
			region,
			realm,
			name,
			display_realm,
			display_name,
			gender,
			faction,
			race,
			class: character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
			old_guild,
			inset,
			avatar,
			mythic,
			raid,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new CharacterEntity();
		entity.id = id;
		entity.character_id = character_id;
		entity.region = region;
		entity.realm = realm;
		entity.name = name;
		entity.display_realm = display_realm;
		entity.display_name = display_name;
		entity.gender = gender;
		entity.faction = faction;
		entity.race = race;
		entity.class = character_class;
		entity.spec = spec;
		entity.level = level;
		entity.item_level = item_level;
		entity.guild = guild;
		entity.rank = rank;
		entity.old_guild = old_guild;
		entity.inset = inset;
		entity.avatar = avatar;
		entity.mythic = mythic;
		entity.raid = raid;
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
			character_id,
			region,
			realm,
			name,
			display_realm,
			display_name,
			gender,
			faction,
			race,
			class: character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
			old_guild,
			inset,
			avatar,
			mythic,
			raid,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			character_id,
			region,
			realm,
			name,
			display_realm,
			display_name,
			gender,
			faction,
			race,
			class: character_class,
			spec,
			level,
			item_level,
			guild,
			rank,
			old_guild,
			inset,
			avatar,
			mythic,
			raid,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic().character;
	}
}
