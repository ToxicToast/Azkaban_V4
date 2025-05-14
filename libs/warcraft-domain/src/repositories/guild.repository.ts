import { GuildAnemic } from '../anemics';
import { Chainable, Nullable, Optional, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<GuildAnemic>;
	findByFaction(
		faction: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<GuildAnemic>>;
	findByGuildId(
		guild_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<GuildAnemic>;
}

export type GuildRepository = Chainable<
	Repository<GuildAnemic>,
	AdditionalMethods
>;
