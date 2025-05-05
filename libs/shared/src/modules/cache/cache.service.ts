import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Optional } from '../../types';

@Injectable()
export class CacheService {
	constructor(
		@Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
		@Inject('TTL_CONFIG') private readonly ttl: number,
	) {}

	async getKey<Type>(key: string): Promise<Optional<Type>> {
		Logger.log('GetKey', key);
		return await this.cacheManager.get<Optional<Type>>(key);
	}

	async setKey<Type>(
		key: string,
		value: Type,
		ttl?: Optional<number>,
	): Promise<void> {
		Logger.log('SetKey', { key, value, ttl });
		await this.cacheManager.set(key, value, ttl ?? this.ttl);
	}

	async deleteKey(key: string): Promise<void> {
		Logger.log('DeleteKey', key);
		await this.cacheManager.del(key);
	}

	async reset(): Promise<void> {
		Logger.log('Reset', {});
		await this.cacheManager.reset();
	}

	async inCache(key: string): Promise<boolean> {
		Logger.log('InCache', key);
		const data = await this.getKey(key);
		return data !== undefined;
	}
}
