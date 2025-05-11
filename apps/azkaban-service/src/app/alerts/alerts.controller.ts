import { Controller, Logger } from '@nestjs/common';
import {
	ApiAlertsService,
	AzkabanWebhookTopics,
	ControllerHelper,
} from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
	AlertsResponses,
	CreateUserAlert,
	CreateWarcraftCharacterAlert,
} from '../../utils';

@Controller(ControllerHelper('alerts'))
export class AlertsController {
	constructor(private readonly service: ApiAlertsService) {}

	@Span(AzkabanWebhookTopics.APIALERTS + '.service')
	@EventPattern(AzkabanWebhookTopics.APIALERTS)
	async getApiAlerts(@Payload() payload: AlertsResponses) {
		Logger.log('Get API Alerts', payload);
		switch (payload.event_name) {
			default:
				Logger.warn('Unknown event name', payload.event_name);
				break;
			case 'CreateUser':
				this.createUserAlert(payload as CreateUserAlert);
				break;
		}
	}

	private createUserAlert(payload: CreateUserAlert): void {
		Logger.log('Create new user Alert', payload);
		this.service.sendEvent(`New User: ${payload.user.username}`, 'api', [
			'Azkaban',
			'Api',
			'User',
		]);
	}

	private createWarcraftCharacterAlert(
		payload: CreateWarcraftCharacterAlert,
	): void {
		Logger.log('Create new Character Alert', payload);
		this.service.sendEvent(
			`New Character: ${payload.character.name}`,
			'warcraft',
			['Azkaban', 'Api', 'Warcraft', 'Character'],
		);
	}
}
