type EnvironmentConfig = {
	port: number;
	environment: string;
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
	twitch: {
		userId: string;
		clientId: string;
		clientSecret: string;
		accessToken: string;
		refreshToken: string;
		channels: Array<string>;
		logging: boolean;
	};
	telemetry: string;
};

export const AppConfig: EnvironmentConfig = {
	port: process.env.PORT ? Number(process.env.PORT) : 3000,
	environment: process.env.APP_VERSION ?? 'local',
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
	twitch: {
		userId: process.env.TWITCH_USER_ID ?? '',
		clientId: process.env.TWITCH_CLIENT_ID ?? '',
		clientSecret: process.env.TWITCH_CLIENT_SECRET ?? '',
		accessToken: process.env.TWITCH_ACCESS_TOKEN ?? '',
		refreshToken: process.env.TWITCH_REFRESH_TOKEN ?? '',
		channels: process.env.TWITCH_CHANNELS.split(',') ?? [],
		logging: process.env.TWITCH_LOGGING === 'true' ? true : false,
	},
	telemetry: process.env.TELEMETRY_URL ?? 'http://localhost:56572/v1/traces',
};
