export class ForgetPasswordCommand {
	constructor(
		public readonly email: string,
		public readonly username: string,
	) {}
}
