import { v4, validate } from 'uuid';

export class UuidHelper {
	readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static create(): UuidHelper {
		const id = v4();
		return new UuidHelper(id);
	}

	static validate(value: string): boolean {
		return validate(value);
	}
}
