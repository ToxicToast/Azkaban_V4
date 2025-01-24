import { ValueObject } from '@azkaban/shared';

export class UserName implements ValueObject<string> {
	readonly _value: string;

	constructor(value: string) {
		this._value = value;
	}

	get value(): string {
		return this._value;
	}

	equals(valueObject: UserName): boolean {
		return this._value === valueObject._value;
	}
}
