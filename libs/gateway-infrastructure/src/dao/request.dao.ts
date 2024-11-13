import { UserDAO } from './user.dao';
import { Chainable, Optional } from '@toxictoast/azkaban-base-types';

export type RequestDAO = Chainable<
	Request,
	{
		user?: Optional<UserDAO>;
	}
>;
