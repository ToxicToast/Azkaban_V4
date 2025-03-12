import { UserDAO } from '@azkaban/user-infrastructure';
import { AuthModel } from './auth.model';
import { Nullable } from '@azkaban/shared';

export class AuthPresenter {
	constructor(
		private readonly user: Nullable<UserDAO>,
		private readonly groups: Array<string>,
	) {}

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

	public transform(): AuthModel {
		return {
			user: this.user,
			groups: this.groups,
		};
	}

	public checkPassword(password: string): boolean {
		return this.user !== null ? this.user.password === password : false;
	}
}
