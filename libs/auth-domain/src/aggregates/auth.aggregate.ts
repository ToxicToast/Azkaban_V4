import { UserDomain } from '@azkaban/user-domain';
import { AuthAnemic } from '../anemics';

export class AuthAggregate {
	constructor(
		private readonly id: string,
		private readonly user: UserDomain,
		private readonly groups: Array<string>, // TODO: Change to GroupDomain
	) {}

	changeUsername(username: string): void {
		this.user.changeUsername(username);
	}

	changeEmail(email: string): void {
		this.user.changeEmail(email);
	}

	changePassword(password: string): void {
		this.user.changePassword(password);
	}

	toAnemic(): AuthAnemic {
		return {
			id: this.id,
			user: this.user.toAnemic(),
			groups: this.groups,
		};
	}
}
