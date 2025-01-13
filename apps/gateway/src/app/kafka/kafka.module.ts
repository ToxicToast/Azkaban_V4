import { Module } from '@nestjs/common';
import { KafkaModule as BaseModule } from '@azkaban/shared';

@Module({
	imports: [
		BaseModule.forRoot(true, {
			name: 'GATEWAY_SERVICE',
			clientId: 'gateway',
			groupId: 'gateway-consumer',
			brokerHost: process.env.BROKER_HOST,
			brokerPort: Number(process.env.BROKER_PORT),
		}),
	],
})
export class KafkaModule {}
