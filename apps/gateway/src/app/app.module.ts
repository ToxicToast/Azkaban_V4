import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { VersionsModule } from './versions/versions.module';
import { AzkabanModule } from './azkaban/azkaban.module';
import {
	AzkabanTwoFactorModule,
	KafkaAzkabanModule,
} from '@azkaban/gateway-infrastructure';
import { FoodfolioModule } from './foodfolio/foodfolio.module';
import { TwitchModule } from './twitch/twitch.module';
import { WarcraftModule } from './warcraft/warcraft.module';
import { CoworkingModule } from './coworking/coworking.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		KafkaAzkabanModule.forRoot({
			brokerHost: process.env.BROKER_HOST,
			brokerPort: parseInt(process.env.BROKER_PORT),
			producerOnlyMode: false,
			appId: 'gateway-service',
			global: true,
		}),
		AzkabanTwoFactorModule.forRoot({
			global: true,
			appId: 'Azkaban',
		}),
		//
		HealthModule,
		MetricsModule,
		VersionsModule,
		//
		AzkabanModule,
		FoodfolioModule,
		TwitchModule,
		WarcraftModule,
		CoworkingModule,
	],
})
export class AppModule {}
