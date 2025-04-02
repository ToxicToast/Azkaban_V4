import { AggregateRoot, Domain, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import {
	ChangeDisplayNameEvent,
	ChangeDisplayRealmEvent,
	ChangeGenderEvent,
} from '../events';

export class CharacterDomain
	extends AggregateRoot
	implements Domain<CharacterAnemic>
{
	constructor(
		private readonly id: number,
		private readonly character_id: string,
		private readonly region: string,
		private readonly realm: string,
		private readonly name: string,
		private display_realm: Nullable<string>,
		private display_name: Nullable<string>,
		private gender: Nullable<string>,
		private faction: Nullable<string>,
		private race: Nullable<string>,
		private character_class: Nullable<string>,
		private spec: Nullable<string>,
		private level: number,
		private item_level: number,
		private guild: Nullable<string>,
		private rank: Nullable<number>,
		private inset: Nullable<string>,
		private avatar: Nullable<string>,
		private mythic: number,
		private raid: Nullable<string>,
		private activated_at: Nullable<Date>,
		private loggedin_at: Nullable<Date>,
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
			region: this.region,
			realm: this.realm,
			name: this.name,
			display_realm: this.display_realm,
			display_name: this.display_name,
			gender: this.gender,
			faction: this.faction,
			race: this.race,
			class: this.character_class,
			spec: this.spec,
			level: this.level,
			item_level: this.item_level,
			guild: this.guild,
			rank: this.rank,
			inset: this.inset,
			avatar: this.avatar,
			mythic: this.mythic,
			raid: this.raid,
			activated_at: this.activated_at,
			loggedin_at: this.loggedin_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	changeDisplayRealm(display_realm: Nullable<string>): void {
		if (display_realm !== this.display_realm) {
			this.updated_at = new Date();
			this.display_realm = display_realm;
			this.addDomainEvent(
				new ChangeDisplayRealmEvent(this.id, display_realm),
			);
		}
	}

	changeDisplayName(display_name: Nullable<string>): void {
		if (display_name !== this.display_name) {
			this.updated_at = new Date();
			this.display_name = display_name;
			this.addDomainEvent(
				new ChangeDisplayNameEvent(this.id, display_name),
			);
		}
	}

	changeGender(gender: Nullable<string>): void {
		if (gender !== this.gender) {
			this.updated_at = new Date();
			this.gender = gender;
			this.addDomainEvent(new ChangeGenderEvent(this.id, gender));
		}
	}

	changeFaction(faction: Nullable<string>): void {
		if (faction !== this.faction) {
			this.updated_at = new Date();
			this.faction = faction;
		}
	}

	changeRace(race: Nullable<string>): void {
		if (race !== this.race) {
			this.updated_at = new Date();
			this.race = race;
		}
	}

	changeClass(character_class: Nullable<string>): void {
		if (character_class !== this.character_class) {
			this.updated_at = new Date();
			this.character_class = character_class;
		}
	}

	changeSpec(spec: Nullable<string>): void {
		if (spec !== this.spec) {
			this.updated_at = new Date();
			this.spec = spec;
		}
	}
	changeLevel(level: number): void {
		if (level !== this.level) {
			this.updated_at = new Date();
			this.level = level;
		}
	}

	changeItemLevel(item_level: number): void {
		if (item_level !== this.item_level) {
			this.updated_at = new Date();
			this.item_level = item_level;
		}
	}

	changeGuild(guild: Nullable<string>): void {
		if (guild !== this.guild) {
			this.updated_at = new Date();
			this.guild = guild;
		}
	}

	changeRank(rank: Nullable<number>): void {
		if (rank !== this.rank) {
			this.updated_at = new Date();
			this.rank = rank;
		}
	}

	changeInset(inset: Nullable<string>): void {
		if (inset !== this.inset) {
			this.updated_at = new Date();
			this.inset = inset;
		}
	}

	changeAvatar(avatar: Nullable<string>): void {
		if (avatar !== this.avatar) {
			this.updated_at = new Date();
			this.avatar = avatar;
		}
	}

	changeMythic(mythic: number): void {
		if (mythic !== this.mythic) {
			this.updated_at = new Date();
			this.mythic = mythic;
		}
	}

	changeRaid(raid: Nullable<string>): void {
		if (raid !== this.raid) {
			this.updated_at = new Date();
			this.raid = raid;
		}
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		if (loggedin_at !== this.loggedin_at) {
			this.updated_at = new Date();
			this.loggedin_at = loggedin_at;
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
