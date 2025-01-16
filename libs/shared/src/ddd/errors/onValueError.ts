export class onValueError extends Error {
	constructor() {
		super(
			"Can't get the error value of a successful result. Use 'value' instead.",
		);
	}
}
