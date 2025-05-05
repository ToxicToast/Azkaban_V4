import { Injectable, Logger } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import { CacheService, Optional } from '@azkaban/shared';

@Injectable()
export class GuildsCache {
	constructor(private readonly service: CacheService) {}

	@Span('cacheGuildsList')
	async cacheGuildsList(
		guildList: unknown,
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<void> {
		let cacheKey = 'warcraft:guilds:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		await this.service.setKey(cacheKey, guildList);
	}

	@Span('cacheGuildById')
	async cacheCharacterById(id: number, guild: unknown): Promise<void> {
		const cacheKey = 'warcraft:guilds:id:' + id;
		await this.service.setKey(cacheKey, guild);
	}

	@Span('cacheGuildByGuildId')
	async cacheCharacterByGuildId(
		guild_id: string,
		guild: unknown,
	): Promise<void> {
		const cacheKey = 'warcraft:guilds:guildid:' + guild_id;
		await this.service.setKey(cacheKey, guild);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('warcraft:guilds:*');
	}
}
