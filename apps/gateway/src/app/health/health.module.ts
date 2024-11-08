import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthModule as BaseModule } from '@azkaban/gateway-infrastructure';

@Module({
	imports: [BaseModule.forRoot(true)],
	controllers: [HealthController],
})
export class HealthModule {}
