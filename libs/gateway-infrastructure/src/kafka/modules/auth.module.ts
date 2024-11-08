import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModule } from './kafka.module';
import { KafkaAuthService } from '../services';

@Module({})
export class KafkaAuthModule {

	static forRoot(options: {
		brokerHost: string,
		brokerPort: number,
		producerOnlyMode?: boolean,
		appId: string,
	}): DynamicModule {
		return {
			module: KafkaAuthModule,
			imports: [
				KafkaModule.register({
					name: 'AZKABAN_AUTH',
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
		}
	}

}