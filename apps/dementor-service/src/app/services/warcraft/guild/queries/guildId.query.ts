import { Optional } from '@azkaban/shared';

export class GuildIdQuery {
	constructor(
		public readonly guild_id: string,
		public readonly withDeleted?: Optional<boolean>,
	) {}
}
