import { Optional } from '../../types';

export interface BrokerConfig {
	clientId: string;
	groupId: string;
	brokerHost: string;
	brokerPort: number;
	withSasl: boolean;
	brokerUsername?: Optional<string>;
	brokerPassword?: Optional<string>;
}
