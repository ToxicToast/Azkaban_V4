import { CharacterDomain } from '../domains';
import { CharacterAnemic } from '../anemics';
import { Nullable } from '@azkaban/shared';

export class CharacterAggregate {
	constructor(private readonly character: CharacterDomain) {}

	changeRegion(region: string): void {
		this.character.changeRegion(region);
	}

	changeRealm(realm: string): void {
		this.character.changeRealm(realm);
	}

	changeName(name: string): void {
		this.character.changeName(name);
	}

	changeGender(gender_id: Nullable<number>): void {
		this.character.changeGender(gender_id);
	}

	changeFaction(faction_id: Nullable<number>): void {
		this.character.changeFaction(faction_id);
	}

	changeRace(race_id: Nullable<number>): void {
		this.character.changeRace(race_id);
	}

	changeClass(class_id: Nullable<number>): void {
		this.character.changeClass(class_id);
	}

	changeSpec(spec_id: Nullable<number>): void {
		this.character.changeSpec(spec_id);
	}

	changeLevel(level: Nullable<number>): void {
		this.character.changeLevel(level);
	}

	changeItemLevel(item_level: Nullable<number>): void {
		this.character.changeItemLevel(item_level);
	}

	changeGuild(guild_id: Nullable<number>): void {
		this.character.changeGuild(guild_id);
	}

	changeRank(rank_id: Nullable<number>): void {
		this.character.changeRank(rank_id);
	}

	activateCharacter(): void {
		this.character.activateCharacter();
	}

	deactivateCharacter(): void {
		this.character.deactivateCharacter();
	}

	deleteCharacter(): void {
		this.character.deleteCharacter();
	}

	restoreCharacter(): void {
		this.character.restoreCharacter();
	}

	toAnemic(): CharacterAnemic {
		return this.character.toAnemic();
	}
}
