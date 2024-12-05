import { DynamicModule, INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { connectKafka } from '@toxictoast/sleepyazkaban-kafka';

import {
	configureApp,
	configureFilters,
	configureInterceptors,
	configureCors,
	configureValidation,
} from '@toxictoast/sleepyazkaban-base-helpers';

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule);
}

async function startApp(app: INestApplication): Promise<void> {
	const port = process.env.PORT ?? 3000;
	await app.startAllMicroservices();
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	const globalPrefix = process.env.API_PREFIX ?? 'api';
	const brokerHost = process.env.BROKER_HOST ?? 'localhost';
	const brokerPort = parseInt(process.env.BROKER_PORT) ?? 9092;
	//
	const app = await createApp();
	await connectKafka(app, brokerHost, brokerPort);
	configureApp(app, globalPrefix);
	configureFilters(app);
	configureInterceptors(app);
	configureCors(app, '*');
	configureValidation(app, AppModule as unknown as DynamicModule);
	await startApp(app);
}

bootstrap()
	.catch((err) => Logger.error(err))
	.then(() => {
		Logger.log(`🚀 Auth is running`);
		Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
	});
