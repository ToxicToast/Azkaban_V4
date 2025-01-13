import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BrokerConfig } from './broker.config';

@Module({})
export class KafkaModule {
	static forRoot(global: boolean, config: BrokerConfig): DynamicModule {
		const brokerUrl = `${config.brokerHost}:${config.brokerPort}`;

		return {
			module: KafkaModule,
			imports: [
				ClientsModule.register([
					{
						name: config.name,
						transport: Transport.KAFKA,
						options: {
							client: {
								clientId: config.clientId,
								brokers: [brokerUrl],
							},
							consumer: {
								groupId: config.groupId,
							},
						},
					},
				]),
			],
			exports: [ClientsModule],
			global,
		};
	}
}
