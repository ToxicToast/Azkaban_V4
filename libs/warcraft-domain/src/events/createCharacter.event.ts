import { DomainEvent } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';

export class CreateCharacterEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_name = 'CreateWarcraftCharacter';

	constructor(
		public readonly aggregate_id: string,
		public readonly character: CharacterAnemic,
	) {}
}
