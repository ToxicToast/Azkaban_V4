import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Optional } from '../types';

export function MicroserviceHelper(
	clientId: string,
	brokerUrl: string,
	groupId: string,
	withSasl: boolean,
	username?: Optional<string>,
	password?: Optional<string>,
): KafkaOptions {
	return {
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: clientId,
				brokers: [brokerUrl],
				sasl: withSasl
					? {
							mechanism: 'plain',
							username: username,
							password: password,
						}
					: undefined,
				connectionTimeout: 4000,
				authenticationTimeout: 4000,
			},
			consumer: {
				groupId: groupId,
			},
		},
	};
}
