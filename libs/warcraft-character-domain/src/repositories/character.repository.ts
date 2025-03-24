import { CharacterAnemic } from '../anemics';
import { Chainable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByGuild(guild_id: number): Promise<Array<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
