import { Nullable } from '@azkaban/shared';

export class DisplayRealm {
	constructor(private readonly display_realm: Nullable<string>) {}

	equals(display_realm: Nullable<string>): boolean {
		return this.display_realm === display_realm;
	}

	changeDisplayRealm(display_realm: Nullable<string>): DisplayRealm {
		return new DisplayRealm(display_realm);
	}

	getDisplayRealm(): Nullable<string> {
		return this.display_realm;
	}
}
