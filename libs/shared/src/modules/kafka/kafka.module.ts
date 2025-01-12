import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BrokerConfig } from './broker.config';

@Module({})
export class KafkaModule {
	static forRoot(global: boolean, config: BrokerConfig): DynamicModule {
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
								brokers: [
									`${config.brokerHost}:${config.brokerPort}`,
								],
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
