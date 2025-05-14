import { Chainable, Nullable, Optional, Repository } from '@azkaban/shared';
import { UserAnemic } from '../anemics';

interface AdditionalMethods {
	findByUserId(
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<UserAnemic>>;
	findByUsername(
		username: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<UserAnemic>>;
	findByEmail(
		email: string,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<UserAnemic>>;
}

export type UserRepository = Chainable<
	Repository<UserAnemic>,
	AdditionalMethods
>;
