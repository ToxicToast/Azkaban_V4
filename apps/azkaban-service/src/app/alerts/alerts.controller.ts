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
	UpdateWarcraftCharacterGuildAlert,
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
				await this.createUserAlert(payload as CreateUserAlert);
				break;
			case 'CreateWarcraftCharacter':
				await this.createWarcraftCharacterAlert(
					payload as CreateWarcraftCharacterAlert,
				);
				break;
			case 'ChangeGuild':
				await this.updateWarcraftCharacterGuild(
					payload as UpdateWarcraftCharacterGuildAlert,
				);
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

	private async createWarcraftCharacterAlert(
		payload: CreateWarcraftCharacterAlert,
	): Promise<void> {
		Logger.log('Create new Character Alert', payload);
		await this.service.sendEvent(
			`New Character: ${payload.character.name}`,
			'warcraft',
			['Azkaban', 'Api', 'Warcraft', 'Character'],
		);
	}

	private async updateWarcraftCharacterGuild(
		payload: UpdateWarcraftCharacterGuildAlert,
	): Promise<void> {
		Logger.log('Update Character Guild Alert', payload);
		const type = payload.guild === null ? 'left' : 'changed';
		const message =
			type === 'left'
				? `Character "${payload.character_id}" left guild "${payload.old_guild}"`
				: `Character "${payload.character_id}" changed guild to ${payload.guild} from "${payload.old_guild}"`;

		await this.service.sendEvent(message, 'warcraft', [
			'Azkaban',
			'Api',
			'Warhammer',
			'Character',
		]);
	}
}
