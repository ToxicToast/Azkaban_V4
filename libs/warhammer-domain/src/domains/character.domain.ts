import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { Corruption, Fate, Wound } from '../valueObjects';
import {
	AddCorruptionEvent,
	AddFateEvent,
	AddWoundEvent,
	CriticalWoundEvent,
	HealWoundEvent,
	UseFateEvent,
	CleanseCorruptionEvent,
	CreateCharacterEvent,
} from '../events';

export class CharacterDomain
	extends AggregateRoot
	implements Domain<CharacterAnemic>
{
	constructor(
		private readonly id: number,
		private readonly character_id: string,
		private readonly name: string,
		private readonly role: string,
		private fate: Fate,
		private wounds: Wound,
		private corruption: Corruption,
		private activated_at: Nullable<Date>,
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
				critical: this.wounds.getCriticalWounds(),
			},
			corruption: {
				current: this.corruption.getCurrentCorruption(),
				total: this.corruption.getTotalCorruption(),
			},
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	createCharacter(): void {
		this.addDomainEvent(
			new CreateCharacterEvent(this.character_id, this.toAnemic()),
		);
	}

	healWound(wound: number) {
		if (!this.wounds.equals(wound)) {
			this.updated_at = new Date();
			const oldWounds = this.wounds.getCurrentWounds();
			this.wounds.healWounds(wound);
			this.addDomainEvent(
				new HealWoundEvent(this.character_id, wound, oldWounds),
			);
		}
	}

	addWound(wound: number) {
		if (!this.wounds.equals(wound)) {
			this.updated_at = new Date();
			const oldWounds = this.wounds.getCurrentWounds();
			const oldCritical = this.wounds.getCriticalWounds();
			this.wounds.addWounds(wound);
			this.addDomainEvent(
				new AddWoundEvent(this.character_id, wound, oldWounds),
			);
			if (this.wounds.isCriticalWound()) {
				this.wounds.inflictCriticalWound();
				this.addDomainEvent(
					new CriticalWoundEvent(
						this.character_id,
						oldCritical,
						this.wounds.getCriticalWounds(),
					),
				);
			}
		}
	}

	addFate(fate: number) {
		if (!this.fate.equals(fate)) {
			this.updated_at = new Date();
			const oldFate = this.fate.getCurrentFate();
			this.fate.addFate(fate);
			this.addDomainEvent(
				new AddFateEvent(this.character_id, fate, oldFate),
			);
		}
	}

	useFate(fate: number) {
		if (!this.fate.equals(fate)) {
			this.updated_at = new Date();
			const oldFate = this.fate.getCurrentFate();
			this.fate.useFate(fate);
			this.addDomainEvent(
				new UseFateEvent(this.character_id, fate, oldFate),
			);
		}
	}

	addCorruption(corruption: number) {
		if (!this.corruption.equals(corruption)) {
			this.updated_at = new Date();
			const oldCorruption = this.corruption.getCurrentCorruption();
			this.corruption.addCorruption(corruption);
			this.addDomainEvent(
				new AddCorruptionEvent(
					this.character_id,
					corruption,
					oldCorruption,
				),
			);
		}
	}

	cleanseCorruption(corruption: number) {
		if (!this.corruption.equals(corruption)) {
			this.updated_at = new Date();
			const oldCorruption = this.corruption.getCurrentCorruption();
			this.corruption.cleanseCorruption(corruption);
			this.addDomainEvent(
				new CleanseCorruptionEvent(
					this.character_id,
					corruption,
					oldCorruption,
				),
			);
		}
	}

	activateCharacter(): void {
		if (this.activated_at === null) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	deactivateCharacter(): void {
		if (this.activated_at !== null) {
			this.updated_at = new Date();
			this.activated_at = null;
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
