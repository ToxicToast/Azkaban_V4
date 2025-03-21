import { UserDAO } from '@azkaban/user-infrastructure';
import { UserModel } from './user.model';
import { Nullable } from '@azkaban/shared';

export class UserPresenter {
	constructor(private readonly user: Nullable<UserDAO>) {}

	private calculateFlagged(): boolean {
		if (!this.user?.loggedin_at) {
			return true;
		}
		const threeMonthDays = 90;
		const second = 1000;
		const minute = 60 * second;
		const hour = 60 * minute;
		const day = 24 * hour;
		const lastLogin = new Date(this.user.loggedin_at);
		const now = new Date();
		const diff = now.getTime() - lastLogin.getTime();
		const days = Math.floor(diff / day);
		return days > threeMonthDays;
	}

	public transform(): UserModel {
		if (this.user !== null) {
			return {
				id: this.user?.id,
				username: this.user?.username,
				email: this.user?.email,
				isActive: !!this.user?.activated_at,
				isBanned: !!this.user?.banned_at,
				isLoggedIn: !!this.user?.loggedin_at,
				isFlagged: !!this.calculateFlagged(),
			};
		}
		return null;
	}
}
