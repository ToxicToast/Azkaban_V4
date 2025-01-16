import { AuthAnemic } from '../anemics';
import { Domain } from '@azkaban/shared';
import { UserAggregate } from './user.aggregate';
import { GroupAggregate } from './group.aggregate';

export class AuthAggregate implements Domain<AuthAnemic> {
	constructor(
		private user: UserAggregate,
		private groups: Array<GroupAggregate>,
	) {}

	toAnemic() {
		return {
			user: this.user.toAnemic(),
			groups: this.groups.map((group) => group.toAnemic()),
		};
	}

	removeGroup(id: string): void {
		this.groups = this.groups.filter((group) => group.toAnemic().id !== id);
	}

	addGroup(group: GroupAggregate): void {
		const found = this.groups.find(
			(g) => g.toAnemic().id === group.toAnemic().id,
		);
		if (!found) {
			this.groups.push(group);
		}
	}

	banUser(): void {
		if (!this.user.isBanned()) {
			this.user.updateBan(new Date());
		}
	}

	unbanUser(): void {
		if (this.user.isBanned()) {
			this.user.updateBan(null);
		}
	}

	activateUser(): void {
		if (!this.user.isActivated()) {
			this.user.updateActivation(new Date());
		}
	}

	deactivateUser(): void {
		if (this.user.isActivated()) {
			this.user.updateActivation(null);
		}
	}

	loginUser(): void {
		this.user.updateLogin(new Date());
	}
}
