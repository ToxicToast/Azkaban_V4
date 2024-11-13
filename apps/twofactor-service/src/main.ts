/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {
	configureApp,
	createApp,
	createMicroservice,
	startApp,
} from '@toxictoast/azkaban-base-helpers';
import { consumerProvider } from '@toxictoast/azkaban-broker-kafka';

async function bootstrap() {
	const environment = process.env.APP_ENV;
	const title = 'Azkaban-Gateway';
	const version = process.env.APP_VERSION;
	const port = Number(process.env.PORT);

	const app = await createApp(AppModule);
	configureApp(app, 'api', {
		type: VersioningType.URI,
	});
	await createMicroservice(app, {
		...consumerProvider({
			brokerHost: process.env.BROKER_HOST,
			brokerPort: Number(process.env.BROKER_PORT),
			appId: 'twofactor-service',
		}),
	});
	await startApp(app, port, true);
	Logger.log(`🚀 ${title} is running`);
	Logger.log(`🚀 Port: ${port}`);
	Logger.log(`🚀 Version: ${version}`);
	Logger.log(`🚀 Environment: ${environment}`);
}

bootstrap();
