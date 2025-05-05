import { GuildAnemic } from '../anemics';
import { Chainable, Nullable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<GuildAnemic>;
	findByFaction(faction: Nullable<string>): Promise<Array<GuildAnemic>>;
	findByGuildId(guild_id: string): Promise<GuildAnemic>;
}

export type GuildRepository = Chainable<
	Repository<GuildAnemic>,
	AdditionalMethods
>;
