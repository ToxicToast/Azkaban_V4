import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { ChangeNameEvent } from '../events';

export class CharacterDomain
	extends AggregateRoot
	implements Domain<CharacterAnemic>
{
	constructor(
		private readonly id: number,
		private readonly character_id: string,
		private name: string,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {
		super();
	}

	toAnemic(): CharacterAnemic {
		return {
			id: this.id,
			character_id: this.character_id,
			name: this.name,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	changeName(name: string): void {
		if (name !== this.name) {
			this.updated_at = new Date();
			const oldName = this.name;
			this.name = name;
			this.addDomainEvent(
				new ChangeNameEvent(this.character_id, name, oldName),
			);
		}
	}

	deleteCharacter(): void {
		if (this.deleted_at === null) {
			this.updated_at = new Date();
			this.deleted_at = new Date();
		}
	}

	restoreCharacter(): void {
		if (this.deleted_at !== null) {
			this.updated_at = new Date();
			this.deleted_at = null;
		}
	}
}
