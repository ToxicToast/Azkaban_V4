export class onErrorValueError extends Error {
	constructor() {
		super(
			"Can't get the value of an error result. Use 'errorValue' instead.",
		);
	}
}
