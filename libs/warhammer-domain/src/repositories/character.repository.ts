import { Chainable, Nullable, Repository } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';

interface AdditionalMethods {
	findByCharacterId(character_id: string): Promise<Nullable<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
