import { AppModule } from './app/app.module';
import {
	addModules,
	configureApp,
	createApp,
	addMiddleware,
	configureCors,
	startApp,
	configureSwagger,
} from '@toxictoast/azkaban-base-helpers';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
	const environment = process.env.APP_ENV;
	const title = 'Azkaban-Gateway';
	const version = process.env.APP_VERSION;
	const port = Number(process.env.PORT);
	const prefix = 'api';

	const app = await createApp(AppModule);
	configureApp(app, prefix, {
		type: VersioningType.URI,
	});
	addModules(app);
	addMiddleware(app, environment);
	configureCors(app);
	configureSwagger(app, prefix, title, undefined, version, environment);
	await startApp(app, port, false);
	Logger.log(`🚀 ${title} is running`);
	Logger.log(`🚀 Port: ${port}`);
	Logger.log(`🚀 Version: ${version}`);
	Logger.log(`🚀 Environment: ${environment}`);
}

bootstrap().catch((err) => Logger.error(err));
