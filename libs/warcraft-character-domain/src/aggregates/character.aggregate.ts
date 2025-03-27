import { CharacterDomain } from '../domains';
import { CharacterAnemic } from '../anemics';
import { Nullable } from '@azkaban/shared';

export class CharacterAggregate {
	constructor(private readonly character: CharacterDomain) {}

	changeDisplayRealm(display_realm: Nullable<string>): void {
		this.character.changeDisplayRealm(display_realm);
	}

	changeDisplayName(display_name: Nullable<string>): void {
		this.character.changeDisplayName(display_name);
	}

	changeGender(gender_id: Nullable<string>): void {
		this.character.changeGender(gender_id);
	}

	changeFaction(faction_id: Nullable<string>): void {
		this.character.changeFaction(faction_id);
	}

	changeRace(race_id: Nullable<string>): void {
		this.character.changeRace(race_id);
	}

	changeClass(class_id: Nullable<string>): void {
		this.character.changeClass(class_id);
	}

	changeSpec(spec_id: Nullable<string>): void {
		this.character.changeSpec(spec_id);
	}

	changeLevel(level: Nullable<number>): void {
		this.character.changeLevel(level);
	}

	changeItemLevel(item_level: Nullable<number>): void {
		this.character.changeItemLevel(item_level);
	}

	changeGuild(guild_id: Nullable<string>): void {
		this.character.changeGuild(guild_id);
	}

	changeRank(rank_id: Nullable<number>): void {
		this.character.changeRank(rank_id);
	}

	changeInset(inset: Nullable<string>): void {
		this.character.changeInset(inset);
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		this.character.changeLoggedIn(loggedin_at);
	}

	changeMythic(mythic: number): void {
		this.character.changeMythic(mythic);
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
