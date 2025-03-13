import { Nullable, Optional, ValueObject } from '@azkaban/shared';

export class LoggedInAtValueObject implements ValueObject<Nullable<Date>> {
	readonly _value: Nullable<Date>;

	constructor(value?: Optional<Date>) {
		this._value = value ?? null;
	}

	equals(valueObject: ValueObject<Nullable<Date>>): boolean {
		return this._value === valueObject._value;
	}

	get value(): Nullable<Date> {
		return this._value;
	}
}
