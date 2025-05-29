import { GuildAnemic } from '../anemics';
import { GuildData, UpdateGuildData } from '../data';
import { GuildFactory } from '../factories';
import { GuildRepository } from '../repositories';
import { DomainEvent, Optional, Result } from '@azkaban/shared';

export class GuildService {
	private readonly factory: GuildFactory = new GuildFactory();

	constructor(private readonly repository: GuildRepository) {}

	private async save(
		anemic: GuildAnemic,
		events: Array<DomainEvent>,
	): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<GuildAnemic>(result, events);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async getGuilds(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<GuildAnemic>>> {
		try {
			const result = await this.repository.findList(
				limit,
				offset,
				withDeleted,
			);
			return Result.ok<Array<GuildAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<GuildAnemic>>(error, 500);
		}
	}

	async getGuildById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.repository.findById(id, withDeleted);
			if (result !== null) {
				return Result.ok<GuildAnemic>(result);
			}
			return Result.fail<GuildAnemic>('Guild not found', 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async getGuildByGuildId(
		guild_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.repository.findByGuildId(
				guild_id,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<GuildAnemic>(result);
			}
			return Result.fail<GuildAnemic>('Guild not found', 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async getGuildByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.repository.findByRegionRealmName(
				region,
				realm,
				name,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<GuildAnemic>(result);
			}
			return Result.fail<GuildAnemic>('Guild not found', 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async createGuild(data: GuildData): Promise<Result<GuildAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			const anemic = aggregate.toAnemic();
			const guild = anemic.guild;
			const events = anemic.events;
			return await this.save(guild, events);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async updateGuild(data: UpdateGuildData): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.getGuildById(data.id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				const { faction, member_count, raid } = data;
				if (faction !== undefined) {
					aggregate.changeFaction(faction);
				}
				if (member_count !== undefined) {
					aggregate.changeMemberCount(member_count);
				}
				if (raid !== undefined) {
					aggregate.changeRaid(raid);
				}
				const anemic = aggregate.toAnemic();
				const guild = anemic.guild;
				const events = anemic.events;
				return await this.save(guild, events);
			}
			return Result.fail<GuildAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async deleteGuild(id: number): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.getGuildById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteGuild();
				const anemic = aggregate.toAnemic();
				const guild = anemic.guild;
				const events = anemic.events;
				return await this.save(guild, events);
			}
			return Result.fail<GuildAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async restoreGuild(id: number): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.getGuildById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreGuild();
				const anemic = aggregate.toAnemic();
				const guild = anemic.guild;
				const events = anemic.events;
				return await this.save(guild, events);
			}
			return Result.fail<GuildAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async activateGuild(id: number): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.getGuildById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateGuild();
				const anemic = aggregate.toAnemic();
				const guild = anemic.guild;
				const events = anemic.events;
				return await this.save(guild, events);
			}
			return Result.fail<GuildAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}

	async deactivateGuild(id: number): Promise<Result<GuildAnemic>> {
		try {
			const result = await this.getGuildById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateGuild();
				const anemic = aggregate.toAnemic();
				const guild = anemic.guild;
				const events = anemic.events;
				return await this.save(guild, events);
			}
			return Result.fail<GuildAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<GuildAnemic>(error, 500);
		}
	}
}
