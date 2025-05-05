import { CharacterAnemic } from '../anemics';
import { Chainable, Nullable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<CharacterAnemic>>;
	findByFaction(faction: Nullable<string>): Promise<Array<CharacterAnemic>>;
	findByRace(race: Nullable<string>): Promise<Array<CharacterAnemic>>;
	findByClass(
		character_class: Nullable<string>,
	): Promise<Array<CharacterAnemic>>;
	findByGuild(guild: Nullable<string>): Promise<Array<CharacterAnemic>>;
	findByCharacterId(character_id: string): Promise<Nullable<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
