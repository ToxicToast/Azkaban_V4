import { UserAnemic } from '../anemics';
import { Repository, Chainable } from '@azkaban/shared';

interface UserAdditions {
	findByUsername(username: string): Promise<UserAnemic>;
	findByEmail(email: string): Promise<UserAnemic>;
}

type RepositoryWithOnlySave = Pick<Repository<UserAnemic>, 'save' | 'findById'>;

export type UserRepository = Chainable<RepositoryWithOnlySave, UserAdditions>;
