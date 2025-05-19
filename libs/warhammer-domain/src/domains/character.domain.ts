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
		private fate: {
			current: number;
			total: number;
		},
		private wounds: {
			current: number;
			total: number;
			critical: number;
		},
		private corruption: {
			current: number;
			total: number;
		},
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
			fate: this.fate,
			wounds: this.wounds,
			corruption: this.corruption,
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
		this.updated_at = new Date();
		const oldWounds = this.wounds.current;
		this.wounds.current = oldWounds - wound;
		this.addDomainEvent(
			new HealWoundEvent(this.character_id, wound, oldWounds),
		);
	}

	addWound(wound: number) {
		this.updated_at = new Date();
		const oldWounds = this.wounds.current;
		const oldCritical = this.wounds.critical;
		this.wounds.current = oldWounds + wound;
		this.addDomainEvent(
			new AddWoundEvent(this.character_id, wound, oldWounds),
		);
		if (this.wounds.current > this.wounds.total) {
			this.wounds.critical = oldCritical + 1;
			this.addDomainEvent(
				new CriticalWoundEvent(
					this.character_id,
					oldCritical,
					this.wounds.critical,
				),
			);
		}
	}

	addFate(fate: number) {
		this.updated_at = new Date();
		const oldFate = this.fate.current;
		this.fate.current = fate;
		this.addDomainEvent(new AddFateEvent(this.character_id, fate, oldFate));
	}

	useFate(fate: number) {
		this.updated_at = new Date();
		const oldFate = this.fate.current;
		this.fate.current = oldFate - fate;
		this.addDomainEvent(new UseFateEvent(this.character_id, fate, oldFate));
	}

	addCorruption(corruption: number) {
		this.updated_at = new Date();
		const oldCorruption = this.corruption.current;
		this.corruption.current = this.corruption.current + corruption;
		this.addDomainEvent(
			new AddCorruptionEvent(
				this.character_id,
				corruption,
				oldCorruption,
			),
		);
	}

	cleanseCorruption(corruption: number) {
		this.updated_at = new Date();
		const oldCorruption = this.corruption.current;
		this.corruption.current = this.corruption.current - corruption;
		this.addDomainEvent(
			new CleanseCorruptionEvent(
				this.character_id,
				corruption,
				oldCorruption,
			),
		);
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
