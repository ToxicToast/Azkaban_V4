import { Injectable, Logger } from '@nestjs/common';
import { GuildsCache } from './guilds.cache';
import { Span } from 'nestjs-otel';
import {
	GuildByGuildIdDTO,
	GuildByIdDTO,
	GuildCreateDTO,
	GuildList,
	GuildUpdateDTO,
} from '../dtos';

@Injectable()
export class GuildsService {
	constructor(private readonly cache: GuildsCache) {}

	@Span('guildList')
	async guildList(data: GuildList): Promise<Array<unknown>> {
		Logger.log('GuildsList', data);
		const guilds = [];
		Logger.log('guilds', guilds);
		await this.cache.cacheGuildsList(guilds, data.limit, data.offset);
		return guilds;
	}

	@Span('guildById')
	async guildById(data: GuildByIdDTO): Promise<unknown> {
		Logger.log('GuildsById', data);
		const guilds = null;
		Logger.log('guilds', guilds);
		if (guilds !== null) {
			await this.cache.cacheCharacterById(data.id, guilds);
			return guilds;
		}
		return null;
	}

	@Span('guildByGuildId')
	async guildByGuildId(data: GuildByGuildIdDTO): Promise<unknown> {
		Logger.log('GuildsByGuildId', data);
		const guilds = null;
		Logger.log('guild', guilds);
		if (guilds !== null) {
			await this.cache.cacheCharacterByGuildId(data.guild_id, guilds);
			return guilds;
		}
		return null;
	}

	@Span('guildCreate')
	async guildCreate(data: GuildCreateDTO): Promise<unknown> {
		Logger.log('GuildCreate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildUpdate')
	async guildUpdate(data: GuildUpdateDTO): Promise<unknown> {
		Logger.debug('GuildUpdate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDelete')
	async guildDelete(data: GuildByIdDTO): Promise<unknown> {
		Logger.debug('GuildDelete', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildRestore')
	async guildRestore(data: GuildByIdDTO): Promise<unknown> {
		Logger.debug('GuildRestore', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildActivate')
	async guildActivate(data: GuildByIdDTO): Promise<unknown> {
		Logger.debug('GuildActivate', data);
		await this.cache.removeCache();
		return null;
	}

	@Span('guildDeactivate')
	async guildDeactivate(data: GuildByIdDTO): Promise<unknown> {
		Logger.debug('GuildDeactivate', data);
		await this.cache.removeCache();
		return null;
	}
}
