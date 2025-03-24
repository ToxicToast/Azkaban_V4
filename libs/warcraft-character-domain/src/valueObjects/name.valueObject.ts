import { Optional, ValueObject } from '@azkaban/shared';

export class NameValueObject implements ValueObject<string> {
	readonly _value: string;

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
