import { Optional } from '@azkaban/shared';

export class ListCommand {
	constructor(
		public readonly limit?: Optional<number>,
		public readonly offset?: Optional<number>,
	) {}
}
