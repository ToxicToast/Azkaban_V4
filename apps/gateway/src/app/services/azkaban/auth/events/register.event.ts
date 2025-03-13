export class RegisterEvent {
	constructor(
		public readonly username: string,
		public readonly email: string,
	) {}
}
