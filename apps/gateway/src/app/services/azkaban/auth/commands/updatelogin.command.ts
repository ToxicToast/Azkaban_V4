export class UpdateLoginCommand {
	constructor(
		public readonly id: string,
		public readonly loggedin_at: Date,
	) {}
}
