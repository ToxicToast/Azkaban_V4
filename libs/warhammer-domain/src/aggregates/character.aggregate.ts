import { CharacterDomain } from '../domains';
import { CharacterAggregateAnemic } from '../anemics';

export class CharacterAggregate {
	constructor(
		private readonly id: string,
		private readonly character: CharacterDomain,
	) {}

	toAnemic(): CharacterAggregateAnemic {
		return {
			id: this.id,
			character: this.character.toAnemic(),
			events: this.character.toEvents(),
		};
	}

	changeWounds(wounds: number, type: 'heal' | 'inflict') {
		if (type === 'heal') {
			this.character.healWound(wounds);
		} else if (type === 'inflict') {
			this.character.addWound(wounds);
		}
	}

	changeFate(fate: number, type: 'fated' | 'use') {
		if (type === 'fated') {
			this.character.addFate(fate);
		} else if (type === 'use') {
			this.character.useFate(fate);
		}
	}

	changeCorruption(corruption: number, type: 'corrupt' | 'cleanse') {
		if (type === 'corrupt') {
			this.character.addCorruption(corruption);
		} else if (type === 'cleanse') {
			this.character.cleanseCorruption(corruption);
		}
	}

	deleteCharacter(): void {
		this.character.deleteCharacter();
	}

	restoreCharacter(): void {
		this.character.restoreCharacter();
	}
}
