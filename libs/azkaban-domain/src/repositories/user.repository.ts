import { Chainable, Nullable, Repository } from '@azkaban/shared';
import { UserAnemic } from '../anemics';

interface AdditionalMethods {
	findByUserId(user_id: string): Promise<Nullable<UserAnemic>>;
	findByUsername(username: string): Promise<Nullable<UserAnemic>>;
	findByEmail(email: string): Promise<Nullable<UserAnemic>>;
}

export type UserRepository = Chainable<
	Repository<UserAnemic>,
	AdditionalMethods
>;
