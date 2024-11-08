import { AppModule } from './app/app.module';
import {
  addModules,
  configureApp,
  createApp,
  addMiddleware,
  configureCors, startApp
} from '@toxictoast/azkaban-base-helpers';
import { Logger, VersioningType } from '@nestjs/common';


async function bootstrap() {
  const environment = process.env.APP_ENV;
  const title = 'Azkaban-Gateway';
  const version = process.env.APP_VERSION;
  const port = Number(process.env.PORT);

  const app = await createApp(AppModule);
  configureApp(app, 'api', {
    type: VersioningType.URI,
  });
  addModules(app);
  addMiddleware(app, environment);
  configureCors(app);
  await startApp(app, port, false);
  Logger.log(`🚀 ${title} is running`);
  Logger.log(`🚀 Port: ${port}`);
  Logger.log(`🚀 Version: ${version}`);
  Logger.log(`🚀 Environment: ${environment}`);
}

bootstrap().catch((err) => Logger.error(err));