import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AzkabanHealthModule } from '@azkaban/gateway-infrastructure';

@Module({
	imports: [AzkabanHealthModule.forRoot(true)],
	controllers: [HealthController],
})
export class HealthModule {}
