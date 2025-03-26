import { CharacterAnemic } from '../anemics';
import { Chainable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRealm(realm: string): Promise<Array<CharacterAnemic>>;
	findByRace(race_id: string): Promise<Array<CharacterAnemic>>;
	findByClass(class_id: string): Promise<Array<CharacterAnemic>>;
	findByFaction(faction_id: string): Promise<Array<CharacterAnemic>>;
	findByGuild(guild_id: string): Promise<Array<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
