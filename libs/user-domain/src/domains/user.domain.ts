import { Domain, Nullable } from '@azkaban/shared';
import { UserAnemic } from '../anemics';
import {
	ActivatedAtValueObject,
	BannedAtValueObject,
	EmailValueObject,
	PasswordValueObject,
	UsernameValueObject,
} from '../valueObjects';

export class UserDomain implements Domain<UserAnemic> {
	constructor(
		private readonly id: string,
		private username: string,
		private email: string,
		private password: string,
		private banned_at: Nullable<Date>,
		private activated_at: Nullable<Date>,
		private loggedin_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	toAnemic(): UserAnemic {
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			password: this.password,
			banned_at: this.banned_at,
			activated_at: this.activated_at,
			loggedin_at: this.loggedin_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	changeUsername(username: string): void {
		const usernameVO = new UsernameValueObject(this.username);
		const newUsernameVO = new UsernameValueObject(username);
		if (!usernameVO.equals(newUsernameVO)) {
			this.updated_at = new Date();
			this.username = newUsernameVO.value;
		}
	}

	changeEmail(email: string): void {
		const emailVO = new EmailValueObject(this.email);
		const newEmailVO = new EmailValueObject(email);
		if (!emailVO.equals(newEmailVO)) {
			this.updated_at = new Date();
			this.email = newEmailVO.value;
		}
	}

	changePassword(password: string): void {
		const passwordVO = new PasswordValueObject(this.password);
		const newPasswordVO = new PasswordValueObject(password);
		if (!passwordVO.equals(newPasswordVO)) {
			this.updated_at = new Date();
			this.password = newPasswordVO.value;
		}
	}

	banUser(): void {
		const banVO = new BannedAtValueObject(this.banned_at);
		const newBannedVO = new BannedAtValueObject();
		if (banVO.equals(newBannedVO)) {
			this.updated_at = new Date();
			this.activated_at = null;
			this.loggedin_at = null;
			this.banned_at = new Date();
		}
	}

	unbanUser(): void {
		const banVO = new BannedAtValueObject(this.banned_at);
		const newBannedVO = new BannedAtValueObject();
		if (!banVO.equals(newBannedVO)) {
			this.updated_at = new Date();
			this.banned_at = null;
		}
	}

	activateUser(): void {
		const activatedVO = new ActivatedAtValueObject(this.activated_at);
		const newActivatedVO = new ActivatedAtValueObject();
		if (activatedVO.equals(newActivatedVO)) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	deactivateUser(): void {
		const activatedVO = new ActivatedAtValueObject(this.activated_at);
		const newActivatedVO = new ActivatedAtValueObject();
		if (!activatedVO.equals(newActivatedVO)) {
			this.updated_at = new Date();
			this.activated_at = null;
		}
	}

	deleteUser(): void {
		if (this.deleted_at === null) {
			this.updated_at = new Date();
			this.deleted_at = new Date();
		}
	}

	restoreUser(): void {
		if (this.deleted_at !== null) {
			this.updated_at = new Date();
			this.deleted_at = null;
		}
	}
}
