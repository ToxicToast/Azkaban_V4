import { Mapper } from '@azkaban/shared';
import { GuildDAO } from '../../dao';
import { GuildEntity } from '../entities';
import { GuildFactory } from '@azkaban/warcraft-domain';

export class GuildMapper implements Mapper<GuildDAO, GuildEntity> {
	private readonly domainFactory: GuildFactory = new GuildFactory();

	toEntity(data: GuildDAO): GuildEntity {
		const {
			id,
			guild_id,
			region,
			realm,
			name,
			faction,
			member_count,
			raid,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new GuildEntity();
		entity.id = id;
		entity.guild_id = guild_id;
		entity.region = region;
		entity.realm = realm;
		entity.name = name;
		entity.faction = faction;
		entity.member_count = member_count;
		entity.raid = raid;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: GuildEntity): GuildDAO {
		const {
			id,
			guild_id,
			region,
			realm,
			name,
			faction,
			member_count,
			raid,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			guild_id,
			region,
			realm,
			name,
			faction,
			member_count,
			raid,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic().guild;
	}
}
