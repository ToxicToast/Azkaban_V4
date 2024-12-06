import { Domain } from '@toxictoast/sleepyazkaban-base-domain';
import { AuthAnemic } from '../anemics';

export class AuthAggregate implements Domain<AuthAnemic> {
	constructor(
		private readonly id: string,
		private readonly username: string,
		private readonly password: string,
		private readonly email: string,
	) {}

	isUpdated(): boolean {
		throw new Error('Method not implemented.');
	}

	isDeleted(): boolean {
		throw new Error('Method not implemented.');
	}

	delete(): void {
		throw new Error('Method not implemented.');
	}

	restore(): void {
		throw new Error('Method not implemented.');
	}

	toAnemic(): AuthAnemic {
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			password: this.password,
		};
	}
}
