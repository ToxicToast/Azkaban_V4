import { Chainable, Repository } from '@azkaban/shared';
import { UserAnemic } from '../anemics';

interface AdditionalMethods {
	findByEmail(email: string): Promise<UserAnemic>;
}

export type UserRepository = Chainable<
	Repository<UserAnemic>,
	AdditionalMethods
>;
