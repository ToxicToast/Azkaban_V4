export class CacheCommand {
	constructor(
		public readonly type: string,
		public readonly data: unknown,
	) {}
}
