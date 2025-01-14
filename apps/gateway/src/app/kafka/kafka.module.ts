import { Module } from '@nestjs/common';
import { AuthTopics, KafkaModule as BaseModule } from '@azkaban/shared';

@Module({
	imports: [
		BaseModule.forRoot(
			true,
			{
				clientId: 'gateway',
				groupId: 'gateway-consumer',
				brokerHost: process.env.BROKER_HOST,
				brokerPort: Number(process.env.BROKER_PORT),
			},
			[
				AuthTopics.LOGIN,
				AuthTopics.REGISTER,
				AuthTopics.FORGET_PASSWORD,
				AuthTopics.VERSION,
			],
		),
	],
})
export class KafkaModule {}
