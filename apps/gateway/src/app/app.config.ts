export const AppConfig = {
	redis: {
		redisHost: process.env.REDIS_HOST,
		redisPort: Number(process.env.REDIS_PORT),
		redisPassword: process.env.REDIS_PASSWORD,
	},
	circuit: {
		timeout: Number(process.env.CIRCUIT_BREAKER_TIMEOUT),
	},
	health: {
		memoryRSSTreshold: Number(process.env.MEMORY_RSS_TRESHOLD),
		memoryHeapTreshold: Number(process.env.MEMORY_HEAP_TRESHOLD),
	},
	broker: {
		brokerHost: process.env.BROKER_HOST,
		brokerPort: Number(process.env.BROKER_PORT),
		brokerUsername: process.env.BROKER_USERNAME,
		brokerPassword: process.env.BROKER_PASSWORD,
	},
};
