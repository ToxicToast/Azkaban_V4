import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BrokerConfig } from './broker.config';
import { KafkaService } from './kafka.service';

@Module({})
export class KafkaModule {
	static forRoot(
		global: boolean,
		config: BrokerConfig,
		topics: Array<string>,
		environment: string,
	): DynamicModule {
		const brokerUrl = `${config.brokerHost}:${config.brokerPort}`;

		return {
			module: KafkaModule,
			imports: [
				ClientsModule.register([
					{
						name: 'GATEWAY_SERVICE',
						transport: Transport.KAFKA,
						options: {
							client: {
								clientId: config.clientId,
								brokers: [brokerUrl],
								sasl:
									environment !== 'local'
										? {
												mechanism: 'plain',
												username: config.brokerUsername,
												password: config.brokerPassword,
											}
										: undefined,
								connectionTimeout: 4000,
								authenticationTimeout: 4000,
							},
							consumer: {
								groupId: config.groupId,
							},
						},
					},
				]),
			],
			providers: [
				{
					provide: 'TOPICS',
					useValue: topics,
				},
				KafkaService,
			],
			exports: [ClientsModule],
			global,
		};
	}
}
