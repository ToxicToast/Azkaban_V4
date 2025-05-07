import { Nullable } from '@azkaban/shared';

export class DisplayName {
	constructor(private readonly display_name: Nullable<string>) {}

	equals(display_name: Nullable<string>): boolean {
		return this.display_name === display_name;
	}

	changeDisplayName(display_name: Nullable<string>): DisplayName {
		return new DisplayName(display_name);
	}

	getDisplayName(): Nullable<string> {
		return this.display_name;
	}
}
