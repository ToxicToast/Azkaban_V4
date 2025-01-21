import { TelemetryHelper } from '@azkaban/shared';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule);
}

function configureApp(app: INestApplication): void {
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableShutdownHooks();
	app.enableVersioning({
		type: VersioningType.URI,
	});
}

function addModules(app: INestApplication): void {
	app.use(compression({}));
	app.use(helmet());
	app.use(cookieParser());
}

function configureCors(app: INestApplication): void {
	app.enableCors({
		origin: '*',
		maxAge: 3600,
		optionsSuccessStatus: 200,
	});
}

async function startApp(app: INestApplication): Promise<void> {
	const port = process.env.PORT ?? 3000;
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	await TelemetryHelper(
		process.env.TELEMETRY_URL,
		'gateway',
		process.env.APP_VERSION,
	);
	const app = await createApp();
	configureApp(app);
	addModules(app);
	configureCors(app);
	await startApp(app);
	Logger.log(`🚀 Dementor is running`);
	Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
}
bootstrap().catch((err) => Logger.error(err));
