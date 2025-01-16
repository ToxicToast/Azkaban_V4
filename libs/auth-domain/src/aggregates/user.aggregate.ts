import { Domain, Nullable } from '@azkaban/shared';
import { UserAnemic } from '../anemics';

export class UserAggregate implements Domain<UserAnemic> {
	constructor(
		private readonly id: string,
		private username: string,
		private password: string,
		private email: string,
		private activated_at: Nullable<Date>,
		private banned_at: Nullable<Date>,
		private loggedin_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	isUpdated(): boolean {
		return !!this.updated_at;
	}
	isDeleted(): boolean {
		return !!this.deleted_at;
	}

	toAnemic(): UserAnemic {
		return {
			id: this.id,
			username: this.username,
			password: this.password,
			email: this.email,
			activated_at: this.activated_at,
			banned_at: this.banned_at,
			loggedin_at: this.loggedin_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	updateActivation(date: Nullable<Date>): void {
		this.activated_at = date;
	}

	updateBan(date: Nullable<Date>): void {
		this.banned_at = date;
	}

	updateLogin(date: Nullable<Date>): void {
		this.loggedin_at = date;
	}

	updateUsername(username: string): void {
		if (username !== this.username) {
			this.username = username;
			this.updated_at = new Date();
		}
	}

	updateEmail(email: string): void {
		if (email !== this.email) {
			this.email = email;
			this.updated_at = new Date();
		}
	}

	updatePassword(password: string): void {
		if (password !== this.password) {
			this.password = password;
			this.updated_at = new Date();
		}
	}
}
