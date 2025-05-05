import { UserDAO } from '@azkaban/azkaban-infrastructure';

export class UsersPresenter {
	constructor(private readonly user: UserDAO) {}

	public transform(): Partial<UserDAO> {
		return {
			...this.user,
			password: undefined,
			salt: undefined,
		};
	}
}
