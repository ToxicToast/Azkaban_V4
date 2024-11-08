import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModule } from './kafka.module';
import { KafkaAuthService } from '../services';

@Module({})
export class KafkaAzkabanModule {
	static forRoot(options: {
		brokerHost: string;
		brokerPort: number;
		producerOnlyMode?: boolean;
		appId: string;
		global?: boolean;
	}): DynamicModule {
		const { brokerHost, brokerPort, appId, producerOnlyMode, global } =
			options;

		return {
			module: KafkaAzkabanModule,
			imports: [
				KafkaModule.register({
					name: 'AZKABAN_BROKER',
					brokerHost: brokerHost,
					brokerPort: brokerPort,
					appId: appId,
					producerOnlyMode: producerOnlyMode ?? false,
				}),
			],
			providers: [KafkaAuthService],
			exports: [KafkaModule, KafkaAuthService],
			global: global ?? false,
		};
	}
}
