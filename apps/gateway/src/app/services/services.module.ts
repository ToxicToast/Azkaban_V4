import { Module } from '@nestjs/common';
import { KafkaModule } from '@azkaban/shared';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		KafkaModule.forRoot(true, {
			name: 'GATEWAY_SERVICE',
			clientId: 'gateway',
			groupId: 'gateway-consumer',
			brokerHost: process.env.BROKER_HOST,
			brokerPort: Number(process.env.BROKER_PORT),
		}),
		AuthModule,
	],
})
export class ServicesModule {}
