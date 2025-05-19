import { Optional } from '@azkaban/shared';

export class IdQuery {
	constructor(
		public readonly id: number,
		public readonly withDeleted?: Optional<boolean>,
	) {}
}
