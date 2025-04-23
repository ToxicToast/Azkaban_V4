import { UserAggregateAnemic } from '../anemics';
import { UserDomain } from '../domains';

export class UserAggregate {
	constructor(
		private readonly id: string,
		private readonly user: UserDomain,
	) {}

	toAnemic(): UserAggregateAnemic {
		return {
			id: this.id,
			user: this.user.toAnemic(),
			events: this.user.toEvents(),
		};
	}

	changeUsername(username: string): void {
		this.user.changeUsername(username);
	}

	changeEmail(email: string): void {
		this.user.changeEmail(email);
	}

	changePassword(password: string, salt: string): void {
		this.user.changePassword(password, salt);
	}

	changeLoggedIn(loggedin_at: Date): void {
		this.user.changeLoggedIn(loggedin_at);
	}

	activateUser(): void {
		this.user.activateUser();
	}

	deactivateUser(): void {
		this.user.deactivateUser();
	}

	deleteUser(): void {
		this.user.deleteUser();
	}

	restoreUser(): void {
		this.user.restoreUser();
	}
}
