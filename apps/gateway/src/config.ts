type EnvironmentConfig = {
	port: number;
	environment: string;
	redis: {
		redisHost: string;
		redisPort: number;
		redisPassword: string;
	};
	circuit: {
		timeout: number;
	};
	health: {
		memoryRSSTreshold: number;
		memoryHeapTreshold: number;
	};
	broker: {
		brokerHost: string;
		brokerPort: number;
		brokerUsername: string;
		brokerPassword: string;
	};
	telemetry: string;
};

export const AppConfig: EnvironmentConfig = {
	port: process.env.PORT ? Number(process.env.PORT) : 3000,
	environment: process.env.APP_VERSION ?? 'local',
	redis: {
		redisHost: process.env.REDIS_HOST ?? 'localhost',
		redisPort: process.env.REDIS_PORT
			? Number(process.env.REDIS_PORT)
			: 6379,
		redisPassword: process.env.REDIS_PASSWORD ?? '',
	},
	circuit: {
		timeout: process.env.CIRCUIT_BREAKER_TIMEOUT
			? Number(process.env.CIRCUIT_BREAKER_TIMEOUT)
			: 10000,
	},
	health: {
		memoryRSSTreshold: process.env.MEMORY_RSS_TRESHOLD
			? Number(process.env.MEMORY_RSS_TRESHOLD)
			: 157286400,
		memoryHeapTreshold: process.env.MEMORY_HEAP_TRESHOLD
			? Number(process.env.MEMORY_HEAP_TRESHOLD)
			: 157286400,
	},
	broker: {
		brokerHost: process.env.BROKER_HOST ?? 'localhost',
		brokerPort: process.env.BROKER_PORT
			? Number(process.env.BROKER_PORT)
			: 9092,
		brokerUsername: process.env.BROKER_USERNAME ?? 'admin',
		brokerPassword: process.env.BROKER_PASSWORD ?? 'admin',
	},
	telemetry: process.env.TELEMETRY_URL ?? 'http://localhost:56572/v1/traces',
};
