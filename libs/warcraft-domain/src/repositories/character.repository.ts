import { CharacterAnemic } from '../anemics';
import { Chainable, Nullable, Optional, Repository } from '@azkaban/shared';

interface AdditionalMethods {
	findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<CharacterAnemic>>;
	findByFaction(
		faction: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterAnemic>>;
	findByRace(
		race: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterAnemic>>;
	findByClass(
		character_class: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterAnemic>>;
	findByGuild(
		guild: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterAnemic>>;
	findByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<CharacterAnemic>>;
	findByUserId(
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterAnemic>>;
}

export type CharacterRepository = Chainable<
	Repository<CharacterAnemic>,
	AdditionalMethods
>;
