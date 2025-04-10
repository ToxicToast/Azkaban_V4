import { Optional } from '@azkaban/shared';

export class ListQuery {
	constructor(
		public readonly limit?: Optional<number>,
		public readonly offset?: Optional<number>,
	) {}
}
