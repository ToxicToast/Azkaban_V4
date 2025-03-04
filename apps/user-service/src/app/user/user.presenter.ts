import { UserDAO } from '@azkaban/user-infrastructure';
import { UserModel } from './user.model';

export class UserPresenter {
	constructor(private readonly user: UserDAO) {}

	public transform(): UserModel {
		return {
			id: this.user.id,
			username: this.user.username,
			email: this.user.email,
			isActive: !!this.user.activated_at,
			isBanned: !!this.user.banned_at,
			isLoggedIn: !!this.user.loggedin_at,
		};
	}
}
