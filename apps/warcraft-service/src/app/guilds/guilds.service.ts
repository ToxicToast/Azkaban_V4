import { Inject, Injectable, Logger } from '@nestjs/common';
import { GuildsCache } from './guilds.cache';
import { Span } from 'nestjs-otel';
import {
	GuildByGuildIdDTO,
	GuildByIdDTO,
	GuildCreateDTO,
	GuildList,
	GuildUpdateDTO,
} from '../../utils';
import {
	GuildDAO,
	GuildEntity,
	GuildRepository,
	GuildService as BaseService,
} from '@azkaban/warcraft-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class GuildsService {
	private readonly infrastructureRepository: GuildRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		private readonly cache: GuildsCache,
		@Inject('GUILD_REPOSITORY')
		private readonly guildRepository: Repository<GuildEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.infrastructureRepository = new GuildRepository(
			this.guildRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
			this.eventEmitter,
		);
	}

	@Span('guildList')
	async guildList(data: GuildList): Promise<Array<GuildDAO>> {
		const guilds = await this.infrastructureService.getGuildList(
			data.limit,
			data.offset,
			data.withDeleted,
		);
		await this.cache.cacheGuildsList(
			guilds,
			data.limit,
			data.offset,
			data.withDeleted,
		);
		return guilds;
	}

	@Span('guildById')
	async guildById(data: GuildByIdDTO): Promise<GuildDAO> {
		const guild = await this.infrastructureService.getGuildById(
			data.id,
			data.withDeleted,
		);
		if (guild !== null) {
			await this.cache.cacheCharacterById(
				guild,
				data.id,
				data.withDeleted,
			);
			return guild;
		}
		return null;
	}

	@Span('guildByGuildId')
	async guildByGuildId(data: GuildByGuildIdDTO): Promise<GuildDAO> {
		const guild = await this.infrastructureService.getGuildByGuildId(
			data.guild_id,
			data.withDeleted,
		);
		if (guild !== null) {
			await this.cache.cacheCharacterByGuildId(
				guild,
				data.guild_id,
				data.withDeleted,
			);
			return guild;
		}
		return null;
	}

	@Span('guildCreate')
	async guildCreate(data: GuildCreateDTO): Promise<GuildDAO> {
		await this.cache.removeCache();
		return await this.infrastructureService.createGuild(data);
	}

	@Span('guildUpdate')
	async guildUpdate(data: GuildUpdateDTO): Promise<GuildDAO> {
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDelete')
	async guildDelete(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.log('GuildDelete', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildRestore')
	async guildRestore(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.log('GuildRestore', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildActivate')
	async guildActivate(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.log('GuildActivate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDeactivate')
	async guildDeactivate(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.log('GuildDeactivate', data);
		await this.cache.removeCache();
		return null;
	}
}
