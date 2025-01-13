import { Optional } from '../../types';

export interface RedisConfig {
	redisHost: string;
	redisPort: number;
	redisPassword: string;
	ttl?: Optional<number>;
}
