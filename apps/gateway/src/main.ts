import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { TelemetryHelper } from '@azkaban/shared';
import { AppConfig } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const telemetry = TelemetryHelper(
	AppConfig.telemetry,
	'gateway',
	AppConfig.environment,
);

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create<INestApplication>(AppModule);
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

function configureSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('Dementor')
		.setVersion('v0.5.8')
		.addBearerAuth()
		.addOAuth2()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	//
	SwaggerModule.setup('swagger', app, document);
}

function configureGuards(app: INestApplication): void {
	//
}

function configureCors(app: INestApplication): void {
	app.enableCors({
		origin: [
			'http://localhost:5173',
			'http://localhost:4200',
			'https://version.toxictoast.de',
			'https://www.toxictoast.de',
		],
		maxAge: 3600,
		optionsSuccessStatus: 200,
	});
}

async function startApp(app: INestApplication): Promise<void> {
	const port = AppConfig.port;
	await app.listen(port, '0.0.0.0');
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	telemetry.start();
	const app = await createApp();
	configureApp(app);
	addModules(app);
	configureSwagger(app);
	configureGuards(app);
	configureCors(app);
	await startApp(app);
	Logger.log(`🚀 Dementor is running`);
	Logger.log(`🚀 Version: ${AppConfig.environment}`);
}
bootstrap().catch((err) => {
	Logger.error(err);
	telemetry
		.shutdown()
		.then(() => Logger.log('Tracing terminated'))
		.catch((error) => Logger.error('Error terminating tracing', error))
		.finally(() => process.exit(0));
});
