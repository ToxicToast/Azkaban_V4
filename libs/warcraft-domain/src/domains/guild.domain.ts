import { AggregateRoot, Domain, DomainEvent, Nullable } from '@azkaban/shared';
import { GuildAnemic } from '../anemics';
import {
	ChangeFactionEvent,
	ChangeMemberCountEvent,
	ChangeRaidEvent,
	CreateGuildEvent,
} from '../events';

export class GuildDomain extends AggregateRoot implements Domain<GuildAnemic> {
	constructor(
		private readonly id: number,
		private readonly guild_id: string,
		private readonly region: string,
		private readonly realm: string,
		private readonly name: string,
		private faction: Nullable<string>,
		private member_count: number,
		private raid: Nullable<string>,
		private activated_at: Nullable<Date>,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {
		super();
	}

	toAnemic(): GuildAnemic {
		return {
			id: this.id,
			guild_id: this.guild_id,
			region: this.region,
			realm: this.realm,
			name: this.name,
			faction: this.faction,
			member_count: this.member_count,
			raid: this.raid,
			activated_at: this.activated_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}

	toEvents(): Array<DomainEvent> {
		return this.pullDomainEvents();
	}

	createGuild(): void {
		this.addDomainEvent(
			new CreateGuildEvent(this.guild_id, this.toAnemic()),
		);
	}

	changeFaction(faction: Nullable<string>): void {
		if (faction !== this.faction) {
			this.updated_at = new Date();
			const oldFaction = this.faction;
			this.faction = faction;
			this.addDomainEvent(
				new ChangeFactionEvent(this.guild_id, faction, oldFaction),
			);
		}
	}

	changeRaid(raid: Nullable<string>): void {
		if (raid !== this.raid) {
			this.updated_at = new Date();
			const oldRaid = this.raid;
			this.raid = raid;
			this.addDomainEvent(
				new ChangeRaidEvent(this.guild_id, raid, oldRaid),
			);
		}
	}

	changeMemberCount(member_count: number): void {
		if (member_count !== this.member_count) {
			this.updated_at = new Date();
			const oldMemberCount = this.member_count;
			this.member_count = member_count;
			this.addDomainEvent(
				new ChangeMemberCountEvent(
					this.guild_id,
					member_count,
					oldMemberCount,
				),
			);
		}
	}

	activateGuild(): void {
		if (this.activated_at === null) {
			this.updated_at = new Date();
			this.activated_at = new Date();
		}
	}

	deactivateGuild(): void {
		if (this.activated_at !== null) {
			this.updated_at = new Date();
			this.activated_at = null;
		}
	}

	deleteGuild(): void {
		if (this.deleted_at === null) {
			this.updated_at = new Date();
			this.deleted_at = new Date();
		}
	}

	restoreGuild(): void {
		if (this.deleted_at !== null) {
			this.updated_at = new Date();
			this.deleted_at = null;
		}
	}
}
