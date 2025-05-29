import { Optional } from '@azkaban/shared';

export class UserIdQuery {
	constructor(
		public readonly user_id: string,
		public readonly withDeleted?: Optional<boolean>,
	) {}
}
