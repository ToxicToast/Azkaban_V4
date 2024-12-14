import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '@azkaban/auth-infrastructure';

@Module({
	imports: [AuthUseCasesModule.register()],
})
export class AppModule {}

/*
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
 */
