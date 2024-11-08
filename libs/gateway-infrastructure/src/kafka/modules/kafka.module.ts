import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { clientProvider } from '@toxictoast/azkaban-broker-kafka';

@Module({
	imports: [
		ConfigModule.forRoot(),
	],
	exports: [
		ConfigModule
	],
})
export class KafkaModule {

	static register(options: {
		name: string,
		brokerHost: string,
		brokerPort: number,
		appId: string,
		producerOnlyMode?: boolean;
	}): DynamicModule {
		const { name, brokerHost, brokerPort, appId, producerOnlyMode } = options;

		const brokerClientProvider = clientProvider({
			brokerHost,
			brokerPort,
			appId,
			producerOnlyMode,
		});

		return {
			module: KafkaModule,
			imports: [
				ConfigModule.forRoot(),
				ClientsModule.register([
					{
						name,
						...brokerClientProvider,
					}
				]),
			],
			providers: [
				ConfigService
			],
			exports: [
				ConfigModule,
				ClientsModule,
			]
		}
	}

}