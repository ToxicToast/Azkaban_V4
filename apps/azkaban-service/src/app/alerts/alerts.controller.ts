import { Controller, Logger } from '@nestjs/common';
import {
	ApiAlertsService,
	AzkabanWebhookTopics,
	ControllerHelper,
} from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller(ControllerHelper('alerts'))
export class AlertsController {
	constructor(private readonly service: ApiAlertsService) {}

	@Span(AzkabanWebhookTopics.APIALERTS + '.service')
	@EventPattern(AzkabanWebhookTopics.APIALERTS)
	async getApiAlerts(@Payload() payload: unknown) {
		Logger.log('Get API Alerts', payload);
	}
}
