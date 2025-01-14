import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function createApp(): Promise<INestApplication> {
	return await NestFactory.create(AppModule);
}

async function createMicroservice(app: INestApplication): Promise<void> {
	const brokerUrl = `${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`;
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'auth',
				brokers: [brokerUrl],
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
	const app = await createApp();
	configureApp(app);
	await createMicroservice(app);
	await startApp(app);
	Logger.log(`🚀 Auth-Service is running`);
	Logger.log(`🚀 Version: ${process.env.APP_VERSION}`);
}
bootstrap().catch((err) => Logger.error(err));
