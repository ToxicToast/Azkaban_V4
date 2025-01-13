import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Optional } from '../../types';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CacheService {
	constructor(
		@Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
		@Inject('TTL_CONFIG') private readonly ttl: number,
	) {}

	async getKey<Type>(key: string): Promise<Optional<Type>> {
		return await this.cacheManager.get<Optional<Type>>(key);
	}

	async setKey<Type>(
		key: string,
		value: Type,
		ttl?: Optional<number>,
	): Promise<void> {
		await this.cacheManager.set(key, value, ttl ?? this.ttl);
	}

	async deleteKey(key: string): Promise<void> {
		await this.cacheManager.del(key);
	}

	async reset(): Promise<void> {
		await this.cacheManager.reset();
	}

	async inCache(key: string): Promise<boolean> {
		const data = await this.getKey(key);
		return data !== undefined;
	}
}
