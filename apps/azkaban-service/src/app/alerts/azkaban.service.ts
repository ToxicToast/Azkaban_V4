import { Injectable, Logger } from '@nestjs/common';
import { ApiAlertsService } from '@azkaban/shared';
import { AlertsResponses, CreateUserAlert } from '../../utils';

@Injectable()
export class AzkabanAlertsService {
	constructor(private readonly service: ApiAlertsService) {}

	async getApiAlerts(
		switchCondition: string,
		payload: AlertsResponses,
	): Promise<void> {
		Logger.log('Get API Alerts for Azkaban', payload);

		switch (switchCondition) {
			case 'CreateUser':
				await this.createUserAlert(payload as CreateUserAlert);
				break;
			default:
				Logger.warn('Unknown event name', payload.event_name);
				break;
		}
	}

	private async createUserAlert(payload: CreateUserAlert): Promise<void> {
		Logger.log('Create new user Alert', payload);
		await this.service.sendEvent(
			`New User: ${payload.user.username}`,
			'api',
			['Azkaban', 'Api', 'User'],
		);
	}
}
