import { Chainable, Nullable, Optional, Repository } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';

interface AdditionalMethods {
	findByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
