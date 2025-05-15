import { Nullable, Optional } from '@azkaban/shared';

export class GuildQuery {
	constructor(
		public readonly guild: Nullable<string>,
		public readonly withDeleted?: Optional<boolean>,
	) {}
}
