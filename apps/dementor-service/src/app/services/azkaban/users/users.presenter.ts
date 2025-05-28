import { UserDAO } from '@azkaban/azkaban-infrastructure';

export class UsersPresenter {
	constructor(
		private readonly user: UserDAO,
		private readonly isLoggedIn: boolean,
	) {}

	public transform(): Partial<UserDAO> {
		return {
			...this.user,
			email: this.isLoggedIn ? this.user.email : undefined,
			password: undefined,
			salt: undefined,
		};
	}
}
