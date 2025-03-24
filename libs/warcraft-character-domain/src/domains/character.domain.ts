import { Domain, Nullable } from '@azkaban/shared';
import { CharacterAnemic } from '../anemics';
import { RegionValueObject } from '../valueObjects';

export class CharacterDomain implements Domain<CharacterAnemic> {
	constructor(
		private readonly id: string,
		private region: string,
		private realm: string,
		private name: string,
		private gender_id: Nullable<number>,
		private faction_id: Nullable<number>,
		private race_id: Nullable<number>,
		private class_id: Nullable<number>,
		private spec_id: Nullable<number>,
		private level: Nullable<number>,
		private item_level: Nullable<number>,
		private guild_id: Nullable<number>,
		private rank_id: Nullable<number>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	toAnemic(): CharacterAnemic {
		return {
			id: this.id,
			region: this.region,
			realm: this.realm,
			name: this.name,
			gender_id: this.gender_id,
			faction_id: this.faction_id,
			race_id: this.race_id,
			class_id: this.class_id,
			spec_id: this.spec_id,
			level: this.level,
			item_level: this.item_level,
			guild_id: this.guild_id,
			rank_id: this.rank_id,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	changeRegion(region: string): void {
		const regionVO = new RegionValueObject(this.region);
		const regionNewVO = new RegionValueObject(region);
		if (!regionVO.equals(regionNewVO)) {
			this.updated_at = new Date();
			this.region = region;
		}
	}

	changeRealm(realm: string): void {
		const realmVO = new RegionValueObject(this.realm);
		const realmNewVO = new RegionValueObject(realm);
		if (!realmVO.equals(realmNewVO)) {
			this.updated_at = new Date();
			this.realm = realm;
		}
	}

	changeName(name: string): void {
		const nameVO = new RegionValueObject(this.name);
		const nameNewVO = new RegionValueObject(name);
		if (!nameVO.equals(nameNewVO)) {
			this.updated_at = new Date();
			this.name = name;
		}
	}

	// TODO: Add ValueObjects and a Real Check
	changeGender(gender_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.gender_id = gender_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeFaction(faction_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.faction_id = faction_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeRace(race_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.race_id = race_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeClass(class_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.class_id = class_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeSpec(spec_id: Nullable<number>): void {
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
	changeGuild(guild_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.guild_id = guild_id;
	}

	// TODO: Add ValueObjects and a Real Check
	changeRank(rank_id: Nullable<number>): void {
		this.updated_at = new Date();
		this.rank_id = rank_id;
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
