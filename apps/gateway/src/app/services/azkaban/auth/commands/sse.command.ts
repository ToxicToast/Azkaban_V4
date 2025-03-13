export class SSECommand {
	constructor(
		public readonly type: string,
		public readonly id: string,
		public readonly username: string,
	) {}
}
