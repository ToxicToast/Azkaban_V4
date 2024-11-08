import { Module } from '@nestjs/common';
import { KafkaAuthModule } from '@azkaban/gateway-infrastructure';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		KafkaAuthModule.forRoot({
			brokerHost: process.env.BROKER_HOST,
			brokerPort: parseInt(process.env.BROKER_PORT),
			producerOnlyMode: false,
			appId: 'gateway-auth'
		})
	],
	controllers: [
		AuthController,
	],
	providers: [
		AuthService
	],
})
export class AuthModule {}
