export class CharacterIdQuery {
	constructor(
		public readonly character_id: string,
		public readonly withDeleted = false,
	) {}
}
