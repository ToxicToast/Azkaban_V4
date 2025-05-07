import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { ChangeNameEvent } from '../events';
import { Fate, Wound } from '../valueObjects';

export class CharacterDomain
	extends AggregateRoot
	implements Domain<CharacterAnemic>
{
	constructor(
		private readonly id: number,
		private readonly character_id: string,
		private name: string,
		private role: string,
		private fate: Fate,
		private wounds: Wound,
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
			role: this.role,
			fate: {
				current: this.fate.getCurrentFate(),
				total: this.fate.getTotalFate(),
			},
			wounds: {
				current: this.wounds.getCurrentWounds(),
				total: this.wounds.getTotalWounds(),
			},
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

	changeRole(role: string): void {
		if (role !== this.role) {
			this.updated_at = new Date();
			const oldRole = this.role;
			this.role = role;
		}
	}

	healWound(wound: number): Wound {
		return this.wounds.healWounds(wound);
	}

	addWound(wound: number): Wound {
		return this.wounds.addWounds(wound);
	}

	addFate(fate: number): Fate {
		return this.fate.addFate(fate);
	}

	useFate(fate: number): Fate {
		return this.fate.useFate(fate);
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
