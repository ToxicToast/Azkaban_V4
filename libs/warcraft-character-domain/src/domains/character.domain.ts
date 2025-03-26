import { Domain, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';

export class CharacterDomain implements Domain<CharacterAnemic> {
	constructor(
		private readonly id: string,
		private readonly region: string,
		private readonly realm: string,
		private display_realm: Nullable<string>,
		private readonly name: string,
		private display_name: Nullable<string>,
		private gender_id: Nullable<string>,
		private faction_id: Nullable<string>,
		private race_id: Nullable<string>,
		private class_id: Nullable<string>,
		private spec_id: Nullable<string>,
		private level: Nullable<number>,
		private item_level: Nullable<number>,
		private guild_id: Nullable<string>,
		private rank_id: Nullable<number>,
		private inset: Nullable<string>,
		private loggedin_at: Nullable<Date>,
		private activated_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	toAnemic(): CharacterAnemic {
		return {
			id: this.id,
			region: this.region,
			realm: this.realm,
			display_realm: this.display_realm,
			name: this.name,
			display_name: this.display_name,
			gender_id: this.gender_id,
			faction_id: this.faction_id,
			race_id: this.race_id,
			class_id: this.class_id,
			spec_id: this.spec_id,
			level: this.level,
			item_level: this.item_level,
			guild_id: this.guild_id,
			rank_id: this.rank_id,
			inset: this.inset,
			loggedin_at: this.loggedin_at,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	// TODO: Add ValueObjects and a Real Check
	changeDisplayRealm(display_realm: Nullable<string>): void {
		this.updated_at = new Date();
		this.display_realm = display_realm;
	}

	// TODO: Add ValueObjects and a Real Check
	changeDisplayName(display_name: Nullable<string>): void {
		this.updated_at = new Date();
		this.display_name = display_name;
	}

	// TODO: Add ValueObjects and a Real Check
	changeGender(gender_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.gender_id = gender_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeFaction(faction_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.faction_id = faction_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeRace(race_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.race_id = race_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeClass(class_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.class_id = class_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeSpec(spec_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.spec_id = spec_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeLevel(level: Nullable<number>): void {
		this.updated_at = new Date();
		this.level = level;
	}

	// TODO: Add ValueObjects and a Real Check
	changeItemLevel(item_level: Nullable<number>): void {
		this.updated_at = new Date();
		this.item_level = item_level;
	}

	// TODO: Add ValueObjects and a Real Check
	changeGuild(guild_id: Nullable<string>): void {
		this.updated_at = new Date();
		this.guild_id = guild_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeRank(rank_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.rank_id = rank_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeInset(inset: Nullable<string>): void {
		this.updated_at = new Date();
		this.inset = inset;
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		this.updated_at = new Date();
		this.loggedin_at = loggedin_at;
	}

	// TODO: Add ValueObjects and a Real Check
	activateCharacter(): void {
		if (this.activated_at === null) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	// TODO: Add ValueObjects and a Real Check
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
