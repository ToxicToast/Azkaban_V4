import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthTopics, KafkaModule } from '@toxictoast/sleepyazkaban-kafka';
import { AzkabanModule } from './azkaban/azkaban.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		//
		AzkabanModule,
		//
		KafkaModule.register({
			appId: 'gateway',
			brokerHost: 'localhost',
			brokerPort: 9092,
			global: true,
			topics: [AuthTopics.REGISTER, AuthTopics.LOGIN],
			producerOnlyMode: false,
		}),
	],
})
export class AppModule {}
