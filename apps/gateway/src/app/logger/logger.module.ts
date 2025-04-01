import { Module } from '@nestjs/common';
import { LoggerModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

@Module({
	imports: [BaseModule.forRoot(true, AppConfig.name)],
})
export class LoggerModule {}
