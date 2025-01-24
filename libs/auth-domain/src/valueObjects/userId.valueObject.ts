import { Optional, UuidHelper, ValueObject } from '@azkaban/shared';

export class UserId implements ValueObject<string> {
	readonly _value: string;

	constructor(value?: Optional<string>) {
		this._value = value ?? UuidHelper.create().value;
	}

	get value(): string {
		return this._value;
	}

	equals(valueObject: UserId): boolean {
		return this._value === valueObject._value;
	}
}
