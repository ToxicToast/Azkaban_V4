export class CreateCommand {
	constructor(
		public readonly region: string,
		public readonly realm: string,
		public readonly name: string,
	) {}
}
