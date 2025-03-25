type EnvironmentConfig = {
	name: string;
	port: number;
	environment: string;
	redis: {
		redisHost: string;
		redisPort: number;
		redisPassword: string;
	};
	database: {
		databaseType: string;
		databaseHost: string;
		databasePort: number;
		databaseUsername: string;
		databasePassword: string;
		databaseTable: string;
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
	gateway: string;
};

export const AppConfig: EnvironmentConfig = {
	name: 'cronjob-service',
	port: process.env.PORT ? Number(process.env.PORT) : 3000,
	environment: process.env.APP_VERSION ?? 'local',
	redis: {
		redisHost: process.env.REDIS_HOST ?? 'localhost',
		redisPort: process.env.REDIS_PORT
			? Number(process.env.REDIS_PORT)
			: 6379,
		redisPassword: process.env.REDIS_PASSWORD ?? '',
	},
	database: {
		databaseType: process.env.DATABASE_TYPE ?? 'postgres',
		databaseHost: process.env.DATABASE_HOST ?? '',
		databasePort: process.env.DATABASE_PORT
			? Number(process.env.DATABASE_PORT)
			: 5432,
		databaseUsername: process.env.DATABASE_USERNAME ?? 'root',
		databasePassword: process.env.DATABASE_PASSWORD ?? 'root',
		databaseTable: process.env.DATABASE_TABLE ?? 'azkaban',
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
	gateway: process.env.GATEWAY_URL ?? 'http://localhost:3000/api/v1',
};
