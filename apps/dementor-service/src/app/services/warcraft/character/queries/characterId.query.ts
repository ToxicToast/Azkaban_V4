import { Optional } from '@azkaban/shared';

export class CharacterIdQuery {
	constructor(
		public readonly character_id: string,
		public readonly withDeleted?: Optional<boolean>,
	) {}
}
