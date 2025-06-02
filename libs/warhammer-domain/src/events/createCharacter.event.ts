import { DomainEvent } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';

export class CreateCharacterEvent implements DomainEvent {
	readonly occured_at = new Date();
	readonly event_namespace = 'Warhammer';
	readonly event_name = 'CreateCharacter';

	constructor(
		public readonly aggregate_id: string,
		public readonly character: CharacterAnemic,
	) {}
}
