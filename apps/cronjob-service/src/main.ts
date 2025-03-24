import { TelemetryHelper } from '@azkaban/shared';
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
	const environment = AppConfig.environment;
	//
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: AppConfig.name,
				brokers: [brokerUrl],
				sasl: {
					mechanism: 'plain',
					username: brokerUsername,
					password: brokerPassword,
				},
				connectionTimeout: 4000,
				authenticationTimeout: 4000,
			},
			consumer: {
				groupId: AppConfig.name + '-consumer',
			},
		},
	});
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
	telemetry.start();
	const app = await createApp();
	configureApp(app);
	await createMicroservice(app);
	await startApp(app);
	Logger.log(`🚀 Cronjob-Service is running`);
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
