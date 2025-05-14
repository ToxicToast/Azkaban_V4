import { GuildService as DomainService } from '@azkaban/warcraft-domain';
import { GuildRepository } from '../repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Optional, UuidHelper } from '@azkaban/shared';
import { GuildDAO } from '../../dao';
import { RpcException } from '@nestjs/microservices';
import { CreateGuildDTO, UpdateGuildDTO } from '../../dto';
import { Logger } from '@nestjs/common';

export class GuildService {
	private readonly domainService: DomainService;

	constructor(
		private readonly repository: GuildRepository,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.domainService = new DomainService(this.repository);
	}

	async getGuildList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<GuildDAO>> {
		const result = await this.domainService.getGuilds(
			limit,
			offset,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { limit, offset },
			});
		}
	}

	async getGuildById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<GuildDAO> {
		const result = await this.domainService.getGuildById(id, withDeleted);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async getGuildByGuildId(
		guild_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<GuildDAO> {
		const result = await this.domainService.getGuildByGuildId(
			guild_id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { guild_id },
			});
		}
	}

	async getGuildByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<GuildDAO> {
		const result = await this.domainService.getGuildByRegionRealmName(
			region,
			realm,
			name,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { region, realm, name },
			});
		}
	}

	async createGuild(data: CreateGuildDTO): Promise<GuildDAO> {
		const guild_id = UuidHelper.create().value;
		const result = await this.domainService.createGuild({
			...data,
			guild_id,
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { data, guild_id },
			});
		}
	}

	async updateGuild(id: number, data: UpdateGuildDTO): Promise<GuildDAO> {
		const { faction, raid, member_count } = data;
		const result = await this.domainService.updateGuild({
			id,
			faction,
			raid,
			member_count,
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, data },
			});
		}
	}

	async deleteGuild(id: number): Promise<GuildDAO> {
		const result = await this.domainService.deleteGuild(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async restoreGuild(id: number): Promise<GuildDAO> {
		const result = await this.domainService.restoreGuild(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async activateGuild(id: number): Promise<GuildDAO> {
		const result = await this.domainService.activateGuild(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async deactivateGuild(id: number): Promise<GuildDAO> {
		const result = await this.domainService.deactivateGuild(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Guild Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}
}
