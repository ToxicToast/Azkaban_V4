import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModule } from './kafka.module';
import { KafkaAuthService } from '../services';

@Module({})
export class KafkaAzkabanModule {

	static forRoot(options: {
		brokerHost: string,
		brokerPort: number,
		producerOnlyMode?: boolean,
		appId: string,
	}): DynamicModule {
		return {
			module: KafkaAzkabanModule,
			imports: [
				KafkaModule.register({
					name: 'AZKABAN_BROKER',
					brokerHost: options.brokerHost,
					brokerPort: options.brokerPort,
					appId: options.appId,
					producerOnlyMode: options.producerOnlyMode ?? false,
				}),
			],
			providers: [
				KafkaAuthService,
			],
			exports: [
				KafkaModule,
				KafkaAuthService,
			],
			global: true
		}
	}

}