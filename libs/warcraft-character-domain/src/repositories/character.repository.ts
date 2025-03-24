import { CharacterAnemic } from '../anemics';
import { Chainable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRealm(realm_id: number): Promise<Array<CharacterAnemic>>;
	findByRace(race_id: number): Promise<Array<CharacterAnemic>>;
	findByClass(class_id: number): Promise<Array<CharacterAnemic>>;
	findByFaction(faction_id: number): Promise<Array<CharacterAnemic>>;
	findByGuild(guild_id: number): Promise<Array<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
