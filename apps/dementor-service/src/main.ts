import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService, TelemetryHelper } from '@azkaban/shared';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppConfig } from './config';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter, RpcExceptionFilter } from './app/filters';

const telemetry = TelemetryHelper(
	AppConfig.telemetry,
	AppConfig.name,
	AppConfig.environment,
);

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create<INestApplication>(AppModule, {
		bufferLogs: true,
	});
}

function createLogger(app: INestApplication): void {
	const logger = new LoggerService(AppConfig.name);
	app.useLogger(logger);
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

function addFilters(app: INestApplication): void {
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalFilters(new RpcExceptionFilter());
}

function configureSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('Dementor')
		.setVersion('v0.10.0')
		.addBearerAuth()
		.addOAuth2()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	//
	SwaggerModule.setup('swagger', app, document);
}

function configureCors(app: INestApplication): void {
	app.enableCors({
		origin: [
			'http://localhost:5173',
			'http://localhost:4200',
			'https://version.toxictoast.de',
			'https://www.toxictoast.de',
			'https://toxictoast.de',
			'https://www.ascend-guild.de',
			'https://ascend-guild.de',
		],
		maxAge: 3600,
		optionsSuccessStatus: 200,
	});
}

async function startApp(app: INestApplication): Promise<void> {
	const port = AppConfig.port;
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	telemetry.start();
	const app = await createApp();
	createLogger(app);
	configureApp(app);
	addModules(app);
	addFilters(app);
	if (AppConfig.environment === 'local') {
		configureSwagger(app);
	}
	configureCors(app);
	await startApp(app);
	Logger.log(`🚀 ${AppConfig.name} is running`);
	Logger.log(`🚀 Version: ${AppConfig.environment}`);
}
bootstrap().catch((err) => {
	Logger.error(err);
	telemetry
		.shutdown()
		.then(() => Logger.log('Tracing terminated'))
		.catch((error) => Logger.error('Error terminating tracing', error));
});
