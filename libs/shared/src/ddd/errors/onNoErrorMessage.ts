export class onNoErrorMessageError extends Error {
	constructor() {
		super(
			'InvalidOperation: A failing result needs to contain an error message',
		);
	}
}
