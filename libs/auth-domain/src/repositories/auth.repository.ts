import { AuthAnemic } from '../anemics';
import { Repository } from '@toxictoast/sleepyazkaban-base-domain';
import { Chainable } from '@toxictoast/sleepyazkaban-base-types';

interface AuthAdditions {
	findByUsername(username: string): Promise<AuthAnemic>;
	findByEmail(email: string): Promise<AuthAnemic>;
	findUser(email: string, username: string): Promise<AuthAnemic>;
}

type RepositoryWithOnlySave = Pick<Repository<AuthAnemic>, 'save'>;

export type AuthRepository = Chainable<RepositoryWithOnlySave, AuthAdditions>;
