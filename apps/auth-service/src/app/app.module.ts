import { Module } from '@nestjs/common';
import { KafkaModule } from '@toxictoast/sleepyazkaban-kafka';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VersionModule } from './version/version.module';
import { NotifyModule } from './notify/notify.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		KafkaModule.register({
			appId: 'auth-service',
			brokerHost: 'localhost',
			brokerPort: 9092,
			global: true,
			topics: [],
			producerOnlyMode: false,
		}),
		EventEmitterModule.forRoot({
			global: true,
		}),
		AuthModule,
		VersionModule,
		NotifyModule,
	],
})
export class AppModule {}
