export class onSuccessError extends Error {
	constructor() {
		super(
			'InvalidOperation: A result cannot be successful and contain an error',
		);
	}
}
