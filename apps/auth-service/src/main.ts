import { TelemetryHelper } from '@azkaban/shared';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const telemetry = TelemetryHelper(
	process.env.TELEMETRY_URL,
	'auth-service',
	process.env.APP_VERSION,
);

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule);
}

async function createMicroservice(app: INestApplication): Promise<void> {
	const brokerUrl = `${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`;
	const brokerUsername = process.env.BROKER_USERNAME;
	const brokerPassword = process.env.BROKER_PASSWORD;
	const environment = process.env.APP_VERSION;
	//
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'auth',
				brokers: [brokerUrl],
				sasl:
					environment !== 'local'
						? {
								mechanism: 'plain',
								username: brokerUsername,
								password: brokerPassword,
							}
						: undefined,
				connectionTimeout: 4000,
				authenticationTimeout: 4000,
			},
			consumer: {
				groupId: 'auth-consumer',
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
	const port = process.env.PORT ?? 3000;
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
	Logger.log(`🚀 Auth-Service is running`);
	Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
}
bootstrap().catch((err) => {
	Logger.error(err);
	telemetry
		.shutdown()
		.then(() => Logger.log('Tracing terminated'))
		.catch((error) => Logger.error('Error terminating tracing', error))
		.finally(() => process.exit(0));
});
