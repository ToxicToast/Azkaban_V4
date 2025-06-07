import { Controller, Logger } from '@nestjs/common';
import { AzkabanWebhookTopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AlertsResponses } from '../../utils';
import { AzkabanAlertsService } from './azkaban.service';
import { WarcraftAlertsService } from './warcraft.service';

@Controller(ControllerHelper('alerts'))
export class AlertsController {
	constructor(
		private readonly azkabanAlerts: AzkabanAlertsService,
		private readonly warcraftAlerts: WarcraftAlertsService,
	) {}

	@Span(AzkabanWebhookTopics.APIALERTS + '.service')
	@EventPattern(AzkabanWebhookTopics.APIALERTS)
	async getApiAlerts(@Payload() payload: AlertsResponses) {
		Logger.log('Get API Alerts', payload);
		const { event_namespace, event_name } = payload;
		switch (event_namespace) {
			default:
				Logger.warn('Unknown event namespace', payload.event_namespace);
				break;
			case 'Azkaban':
				await this.azkabanAlerts.getApiAlerts(event_name, payload);
				break;
			case 'Warcraft':
				await this.warcraftAlerts.getApiAlerts(event_name, payload);
				break;
			case 'Warhammer':
				Logger.warn('Unknown event namespace', { payload });
				break;
		}
	}
}
