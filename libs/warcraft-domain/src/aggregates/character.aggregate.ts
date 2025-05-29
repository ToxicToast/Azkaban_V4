import { CharacterDomain } from '../domains';
import { Nullable } from '@azkaban/shared';
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

	changeDisplayRealm(display_realm: Nullable<string>): void {
		this.character.changeDisplayRealm(display_realm);
	}

	changeDisplayName(display_name: Nullable<string>): void {
		this.character.changeDisplayName(display_name);
	}

	changeGender(gender: Nullable<string>): void {
		this.character.changeGender(gender);
	}

	changeFaction(faction: Nullable<string>): void {
		this.character.changeFaction(faction);
	}

	changeRace(race: Nullable<string>): void {
		this.character.changeRace(race);
	}

	changeClass(character_class: Nullable<string>): void {
		this.character.changeClass(character_class);
	}

	changeSpec(spec: Nullable<string>): void {
		this.character.changeSpec(spec);
	}

	changeLevel(level: Nullable<number>): void {
		this.character.changeLevel(level);
	}

	changeItemLevel(item_level: Nullable<number>): void {
		this.character.changeItemLevel(item_level);
	}

	changeGuild(guild: Nullable<string>): void {
		this.character.changeGuild(guild);
	}

	changeRank(rank: Nullable<number>): void {
		this.character.changeRank(rank);
	}

	changeInset(inset: Nullable<string>): void {
		this.character.changeInset(inset);
	}

	changeAvatar(avatar: Nullable<string>): void {
		this.character.changeAvatar(avatar);
	}

	changeMythic(mythic: number): void {
		this.character.changeMythic(mythic);
	}

	changeRaid(raid: Nullable<string>): void {
		this.character.changeRaid(raid);
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		this.character.changeLoggedIn(loggedin_at);
	}

	changeUser(user_id: Nullable<string>): void {
		this.character.changeUser(user_id);
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
}
