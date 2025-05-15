import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import {
	ChangeAvatarEvent,
	ChangeClassEvent,
	ChangeDisplayNameEvent,
	ChangeDisplayRealmEvent,
	ChangeFactionEvent,
	ChangeGenderEvent,
	ChangeGuildEvent,
	ChangeInsetEvent,
	ChangeItemLevelEvent,
	ChangeLevelEvent,
	ChangeLoggedInEvent,
	ChangeMythicEvent,
	ChangeRaceEvent,
	ChangeRaidEvent,
	ChangeRankEvent,
	ChangeSpecEvent,
	CreateCharacterEvent,
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
		private old_guild: Nullable<string>,
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
			old_guild: this.old_guild,
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

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	createCharacter(): void {
		this.addDomainEvent(
			new CreateCharacterEvent(this.character_id, this.toAnemic()),
		);
	}

	changeDisplayRealm(display_realm: Nullable<string>): void {
		if (this.display_realm !== display_realm) {
			this.updated_at = new Date();
			const oldDisplayRealm = this.display_realm;
			this.display_realm = display_realm;
			this.addDomainEvent(
				new ChangeDisplayRealmEvent(
					this.character_id,
					display_realm,
					oldDisplayRealm,
				),
			);
		}
	}

	changeDisplayName(display_name: Nullable<string>): void {
		if (this.display_name !== display_name) {
			this.updated_at = new Date();
			const oldDisplayName = this.display_name;
			this.display_name = display_name;
			this.addDomainEvent(
				new ChangeDisplayNameEvent(
					this.character_id,
					display_name,
					oldDisplayName,
				),
			);
		}
	}

	changeGender(gender: Nullable<string>): void {
		if (gender !== this.gender) {
			this.updated_at = new Date();
			const oldGender = this.gender;
			this.gender = gender;
			this.addDomainEvent(
				new ChangeGenderEvent(this.character_id, gender, oldGender),
			);
		}
	}

	changeFaction(faction: Nullable<string>): void {
		if (faction !== this.faction) {
			this.updated_at = new Date();
			const oldFaction = this.faction;
			this.faction = faction;
			this.addDomainEvent(
				new ChangeFactionEvent(this.character_id, faction, oldFaction),
			);
		}
	}

	changeRace(race: Nullable<string>): void {
		if (race !== this.race) {
			this.updated_at = new Date();
			const oldRace = this.race;
			this.race = race;
			this.addDomainEvent(
				new ChangeRaceEvent(this.character_id, race, oldRace),
			);
		}
	}

	changeClass(character_class: Nullable<string>): void {
		if (character_class !== this.character_class) {
			this.updated_at = new Date();
			const oldCharacterClass = this.character_class;
			this.character_class = character_class;
			this.addDomainEvent(
				new ChangeClassEvent(
					this.character_id,
					character_class,
					oldCharacterClass,
				),
			);
		}
	}

	changeSpec(spec: Nullable<string>): void {
		if (spec !== this.spec) {
			this.updated_at = new Date();
			const oldSpec = this.spec;
			this.spec = spec;
			this.addDomainEvent(
				new ChangeSpecEvent(this.character_id, spec, oldSpec),
			);
		}
	}
	changeLevel(level: number): void {
		if (level !== this.level) {
			this.updated_at = new Date();
			const oldLevel = this.level;
			this.level = level;
			this.addDomainEvent(
				new ChangeLevelEvent(this.character_id, level, oldLevel),
			);
		}
	}

	changeItemLevel(item_level: number): void {
		if (item_level !== this.item_level) {
			this.updated_at = new Date();
			const oldItemLevel = this.item_level;
			this.item_level = item_level;
			this.addDomainEvent(
				new ChangeItemLevelEvent(
					this.character_id,
					item_level,
					oldItemLevel,
				),
			);
		}
	}

	changeGuild(guild: Nullable<string>): void {
		if (guild !== this.guild) {
			this.updated_at = new Date();
			this.old_guild = this.guild;
			this.guild = guild;
			this.addDomainEvent(
				new ChangeGuildEvent(this.character_id, guild, this.old_guild),
			);
		}
	}

	changeRank(rank: Nullable<number>): void {
		if (rank !== this.rank) {
			this.updated_at = new Date();
			const oldRank = this.rank;
			this.rank = rank;
			this.addDomainEvent(
				new ChangeRankEvent(this.character_id, rank, oldRank),
			);
		}
	}

	changeInset(inset: Nullable<string>): void {
		if (inset !== this.inset) {
			this.updated_at = new Date();
			const oldInset = this.inset;
			this.inset = inset;
			this.addDomainEvent(
				new ChangeInsetEvent(this.character_id, inset, oldInset),
			);
		}
	}

	changeAvatar(avatar: Nullable<string>): void {
		if (avatar !== this.avatar) {
			this.updated_at = new Date();
			const oldAvatar = this.avatar;
			this.avatar = avatar;
			this.addDomainEvent(
				new ChangeAvatarEvent(this.character_id, avatar, oldAvatar),
			);
		}
	}

	changeMythic(mythic: number): void {
		if (mythic !== this.mythic) {
			this.updated_at = new Date();
			const oldMythic = this.mythic;
			this.mythic = mythic;
			this.addDomainEvent(
				new ChangeMythicEvent(this.character_id, mythic, oldMythic),
			);
		}
	}

	changeRaid(raid: Nullable<string>): void {
		if (raid !== this.raid) {
			this.updated_at = new Date();
			const oldRaid = this.raid;
			this.raid = raid;
			this.addDomainEvent(
				new ChangeRaidEvent(this.character_id, raid, oldRaid),
			);
		}
	}

	changeLoggedIn(loggedin_at: Nullable<Date>): void {
		if (loggedin_at?.getTime() !== this.loggedin_at?.getTime()) {
			this.updated_at = new Date();
			const oldLoggedInAt = this.loggedin_at;
			this.loggedin_at = loggedin_at;
			this.addDomainEvent(
				new ChangeLoggedInEvent(
					this.character_id,
					loggedin_at,
					oldLoggedInAt,
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
