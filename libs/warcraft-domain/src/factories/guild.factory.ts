import { Factory, UuidHelper } from '@azkaban/shared';
import { GuildAnemic } from '../anemics';
import { GuildDomain } from '../domains';
import { GuildAggregate } from '../aggregates';
import { GuildData } from '../data';

export class GuildFactory
	implements Factory<GuildAnemic, GuildDomain, GuildData, GuildAggregate>
{
	reconstitute(anemic: GuildAnemic): GuildAggregate {
		const {
			id,
			guild_id,
			region,
			realm,
			name,
			faction,
			raid,
			member_count,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;
		const guildDomain = new GuildDomain(
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
		);
		const uuid = UuidHelper.create().value;
		return new GuildAggregate(uuid, guildDomain);
	}

	constitute(domain: GuildDomain): GuildAnemic {
		return domain.toAnemic();
	}

	createDomain(data: GuildData): GuildAggregate {
		const { guild_id, region, realm, name } = data;
		const domain = new GuildDomain(
			0,
			guild_id,
			region,
			realm,
			name,
			null,
			0,
			null,
			null,
			new Date(),
			null,
			null,
		);
		const uuid = UuidHelper.create().value;
		return new GuildAggregate(uuid, domain);
	}
}
