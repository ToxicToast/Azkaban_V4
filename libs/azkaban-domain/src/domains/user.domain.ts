import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { UserAnemic } from '../anemics';
import {
	CreateUserEvent,
	ChangeUsernameEvent,
	ChangeEmailEvent,
	ChangePasswordEvent,
	ChangeSaltEvent,
	ChangeLoggedInEvent,
} from '../events';

export class UserDomain extends AggregateRoot implements Domain<UserAnemic> {
	constructor(
		private readonly id: number,
		private readonly user_id: string,
		private username: string,
		private email: string,
		private password: string,
		private salt: string,
		private activated_at: Nullable<Date>,
		private loggedin_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {
		super();
	}

	toAnemic(): UserAnemic {
		return {
			id: this.id,
			user_id: this.user_id,
			username: this.username,
			email: this.email,
			password: this.password,
			salt: this.salt,
			activated_at: this.activated_at,
			loggedin_at: this.loggedin_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	createUser(): void {
		this.addDomainEvent(new CreateUserEvent(this.user_id, this.toAnemic()));
	}

	changeUsername(username: string): void {
		if (username !== this.username) {
			this.updated_at = new Date();
			const oldUsername = this.username;
			this.username = username;
			this.addDomainEvent(
				new ChangeUsernameEvent(this.user_id, username, oldUsername),
			);
		}
	}

	changeEmail(email: string): void {
		if (email !== this.email) {
			this.updated_at = new Date();
			const oldEmail = this.email;
			this.email = email;
			this.addDomainEvent(
				new ChangeEmailEvent(this.user_id, email, oldEmail),
			);
		}
	}

	changePassword(password: string, salt: string): void {
		if (password !== this.password) {
			this.updated_at = new Date();
			const oldPassword = this.password;
			this.password = password;
			this.addDomainEvent(
				new ChangePasswordEvent(this.user_id, password, oldPassword),
			);
			const oldSalt = this.salt;
			this.salt = salt;
			this.addDomainEvent(
				new ChangeSaltEvent(this.user_id, salt, oldSalt),
			);
		}
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		if (loggedin_at?.getTime() !== this.loggedin_at?.getTime()) {
			this.updated_at = new Date();
			const oldLoggedInAt = this.loggedin_at;
			this.loggedin_at = loggedin_at;
			this.addDomainEvent(
				new ChangeLoggedInEvent(
					this.user_id,
					loggedin_at,
					oldLoggedInAt,
				),
			);
		}
	}

	activateUser(): void {
		if (this.activated_at === null) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	deactivateUser(): void {
		if (this.activated_at !== null) {
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
