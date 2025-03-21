import { UserDomain } from '../domains';
import { UserAnemic } from '../anemics';
import { Nullable } from '@azkaban/shared';

export class UserAggregate {
	constructor(private readonly user: UserDomain) {}

	changeUsername(username: string): void {
		this.user.changeUsername(username);
	}

	changeEmail(email: string): void {
		this.user.changeEmail(email);
	}

	changePassword(password: string): void {
		this.user.changePassword(password);
	}

	changeSalt(salt: string): void {
		this.user.changeSalt(salt);
	}

	changeLoggedInAt(loggedin_at: Nullable<Date>): void {
		this.user.changeLoggedInAt(loggedin_at);
	}

	banUser(): void {
		this.user.banUser();
	}

	unbanUser(): void {
		this.user.unbanUser();
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

	toAnemic(): UserAnemic {
		return this.user.toAnemic();
	}
}
