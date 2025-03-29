import { MicroserviceHelper, TelemetryHelper } from '@azkaban/shared';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppConfig } from './config';

const telemetry = TelemetryHelper(
	AppConfig.telemetry,
	AppConfig.name,
	AppConfig.environment,
);

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create<INestApplication>(AppModule);
}

async function createMicroservice(app: INestApplication): Promise<void> {
	const brokerUrl = `${AppConfig.broker.brokerHost}:${AppConfig.broker.brokerPort}`;
	const brokerUsername = AppConfig.broker.brokerUsername;
	const brokerPassword = AppConfig.broker.brokerPassword;
	const environment = AppConfig.environment !== 'local';
	//
	const options = MicroserviceHelper(
		AppConfig.name,
		brokerUrl,
		AppConfig.name + '-consumer',
		environment,
		brokerUsername,
		brokerPassword,
	);
	//
	app.connectMicroservice<MicroserviceOptions>(options);
}

function configureApp(app: INestApplication): void {
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableShutdownHooks();
	app.enableVersioning({
		type: VersioningType.URI,
	});
}

async function startApp(app: INestApplication): Promise<void> {
	const port = AppConfig.port;
	await app.startAllMicroservices();
	await app.listen(port);
	Logger.log(`🚀 Listening on Port: ${port}`);
}

async function bootstrap() {
	if (AppConfig.environment !== 'local') {
		telemetry.start();
	}
	const app = await createApp();
	configureApp(app);
	await createMicroservice(app);
	await startApp(app);
	Logger.log(`🚀 Blizzard-Api-Service is running`);
	Logger.log(`🚀 Version: ${AppConfig.environment}`);
}
bootstrap().catch((err) => {
	Logger.error(err);
	if (AppConfig.environment !== 'local') {
		telemetry
			.shutdown()
			.then(() => Logger.log('Tracing terminated'))
			.catch((error) => Logger.error('Error terminating tracing', error));
	}
});
