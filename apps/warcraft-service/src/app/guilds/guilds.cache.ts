import { Injectable } from '@nestjs/common';
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
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:guilds:list';
		if (limit !== undefined) {
			cacheKey += `:limit:${limit}`;
		}
		if (offset !== undefined) {
			cacheKey += `:offset:${offset}`;
		}
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, guildList);
	}

	@Span('cacheGuildById')
	async cacheCharacterById(
		guild: unknown,
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:guilds:id:' + id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, guild);
	}

	@Span('cacheGuildByGuildId')
	async cacheCharacterByGuildId(
		guild: unknown,
		guild_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<void> {
		let cacheKey = 'warcraft:guilds:guildid:' + guild_id;
		if (withDeleted !== undefined) {
			cacheKey += `:withDeleted:${String(withDeleted)}`;
		}
		await this.service.setKey(cacheKey, guild);
	}

	@Span('removeCache')
	async removeCache(): Promise<void> {
		await this.service.deleteKey('warcraft:guilds:*');
	}
}
