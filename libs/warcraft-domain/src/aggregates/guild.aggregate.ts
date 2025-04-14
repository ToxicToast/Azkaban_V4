import { GuildAggregateAnemic } from '../anemics';
import { GuildDomain } from '../domains';
import { Nullable } from '@azkaban/shared';

export class GuildAggregate {
	constructor(
		private readonly id: string,
		private readonly guild: GuildDomain,
	) {}

	toAnemic(): GuildAggregateAnemic {
		return {
			id: this.id,
			guild: this.guild.toAnemic(),
			events: this.guild.toEvents(),
		};
	}

	changeFaction(faction: Nullable<string>): void {
		this.guild.changeFaction(faction);
	}

	changeMemberCount(member_count: number): void {
		this.guild.changeMemberCount(member_count);
	}

	changeRaid(raid: Nullable<string>): void {
		this.guild.changeRaid(raid);
	}

	activateGuild(): void {
		this.guild.activateGuild();
	}

	deactivateGuild(): void {
		this.guild.deactivateGuild();
	}

	deleteGuild(): void {
		this.guild.deleteGuild();
	}

	restoreGuild(): void {
		this.guild.restoreGuild();
	}
}
