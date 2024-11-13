import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModule } from './kafka.module';
import {
	Kafka2FAService,
	KafkaAuthService,
	KafkaUserService,
	KafkaGroupService,
} from '../services';
import { CrudService } from '../services/crud.service';

const services = [
	KafkaAuthService,
	KafkaUserService,
	Kafka2FAService,
	KafkaGroupService,
];

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
			providers: [CrudService, ...services],
			exports: [KafkaModule, ...services],
			global: global ?? false,
		};
	}
}
