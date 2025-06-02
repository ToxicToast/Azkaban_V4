import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AzkabanAlertsService } from './azkaban.service';
import { WarcraftAlertsService } from './warcraft.service';

@Module({
	controllers: [AlertsController],
	providers: [AzkabanAlertsService, WarcraftAlertsService],
})
export class AlertsModule {}
