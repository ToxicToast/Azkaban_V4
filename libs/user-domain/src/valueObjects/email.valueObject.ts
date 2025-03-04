import { Nullable, Optional, ValueObject } from '@azkaban/shared';

export class EmailValueObject implements ValueObject<string> {
	readonly _value: Nullable<string>;

	constructor(value?: Optional<string>) {
		this._value = value ?? null;
	}

	equals(valueObject: ValueObject<string>): boolean {
		return this._value === valueObject._value;
	}

	get value(): string {
		return this._value;
	}
}
