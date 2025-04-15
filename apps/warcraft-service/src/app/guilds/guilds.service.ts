import { Inject, Injectable, Logger } from '@nestjs/common';
import { GuildsCache } from './guilds.cache';
import { Span } from 'nestjs-otel';
import {
	GuildByGuildIdDTO,
	GuildByIdDTO,
	GuildCreateDTO,
	GuildList,
	GuildUpdateDTO,
} from '../dtos';
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
		Logger.log('GuildsList', data);
		const guilds = await this.infrastructureService.getGuildList(
			data.limit,
			data.offset,
		);
		Logger.log('guilds', guilds);
		await this.cache.cacheGuildsList(guilds, data.limit, data.offset);
		return guilds;
	}

	@Span('guildById')
	async guildById(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.log('GuildsById', data);
		const guild = await this.infrastructureService.getGuildById(data.id);
		Logger.log('guild', guild);
		if (guild !== null) {
			await this.cache.cacheCharacterById(data.id, guild);
			return guild;
		}
		return null;
	}

	@Span('guildByGuildId')
	async guildByGuildId(data: GuildByGuildIdDTO): Promise<GuildDAO> {
		Logger.log('GuildsByGuildId', data);
		const guild = await this.infrastructureService.getGuildByGuildId(
			data.guild_id,
		);
		Logger.log('guild', guild);
		if (guild !== null) {
			await this.cache.cacheCharacterByGuildId(data.guild_id, guild);
			return guild;
		}
		return null;
	}

	@Span('guildCreate')
	async guildCreate(data: GuildCreateDTO): Promise<GuildDAO> {
		Logger.log('GuildCreate', data);
		await this.cache.removeCache();
		return await this.infrastructureService.createGuild(data);
	}

	@Span('guildUpdate')
	async guildUpdate(data: GuildUpdateDTO): Promise<GuildDAO> {
		Logger.debug('GuildUpdate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDelete')
	async guildDelete(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.debug('GuildDelete', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildRestore')
	async guildRestore(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.debug('GuildRestore', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildActivate')
	async guildActivate(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.debug('GuildActivate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDeactivate')
	async guildDeactivate(data: GuildByIdDTO): Promise<GuildDAO> {
		Logger.debug('GuildDeactivate', data);
		await this.cache.removeCache();
		return null;
	}
}
