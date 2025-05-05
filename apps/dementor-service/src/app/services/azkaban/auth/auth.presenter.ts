import { UserDAO } from '@azkaban/azkaban-infrastructure';
import { Chainable } from '@azkaban/shared';

export class AuthPresenter {
	constructor(private readonly user: UserDAO) {}

	public transform(): Chainable<Partial<UserDAO>, { sub: string }> {
		return {
			...this.user,
			sub: this.user.user_id,
			user_id: undefined,
		};
	}
}
