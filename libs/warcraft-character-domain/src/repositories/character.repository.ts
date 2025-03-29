import { CharacterAnemic } from '../anemics';
import { Chainable, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterAnemic>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
