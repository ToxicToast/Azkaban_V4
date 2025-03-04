import { UserDAO } from '@azkaban/user-infrastructure';
import { UserModel } from './user.model';
import { Nullable } from '@azkaban/shared';

export class UserPresenter {
	constructor(private readonly user: Nullable<UserDAO>) {}

	public transform(): UserModel {
		return this.user !== null
			? {
					id: this.user?.id,
					username: this.user?.username,
					email: this.user?.email,
					isActive: !!this.user?.activated_at,
					isBanned: !!this.user?.banned_at,
					isLoggedIn: !!this.user?.loggedin_at,
				}
			: null;
	}
}
