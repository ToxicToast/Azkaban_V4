import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { clientProvider } from '@toxictoast/azkaban-broker-kafka';

@Module({})
export class KafkaModule {
	static register(options: {
		name: string;
		brokerHost: string;
		brokerPort: number;
		appId: string;
		producerOnlyMode?: boolean;
		global?: boolean;
	}): DynamicModule {
		const {
			name,
			brokerHost,
			brokerPort,
			appId,
			producerOnlyMode,
			global,
		} = options;

		const brokerClientProvider = clientProvider({
			brokerHost,
			brokerPort,
			appId,
			producerOnlyMode,
		});

		return {
			module: KafkaModule,
			imports: [
				ClientsModule.register([
					{
						name,
						...brokerClientProvider,
					},
				]),
			],
			exports: [ClientsModule],
			global: global ?? false,
		};
	}
}
