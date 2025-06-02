import { Injectable, Logger } from '@nestjs/common';
import { ApiAlertsService } from '@azkaban/shared';
import {
	AlertsResponses,
	CreateWarcraftCharacterAlert,
	UpdateWarcraftCharacterGuildAlert,
} from '../../utils';

@Injectable()
export class WarcraftAlertsService {
	constructor(private readonly service: ApiAlertsService) {}

	async getApiAlerts(
		switchCondition: string,
		payload: AlertsResponses,
	): Promise<void> {
		Logger.log('Get API Alerts for Azkaban', payload);

		switch (switchCondition) {
			case 'CreateCharacter':
				await this.createCharacterAlert(
					payload as CreateWarcraftCharacterAlert,
				);
				break;
			case 'ChangeGuild':
				await this.updateCharacterGuild(
					payload as UpdateWarcraftCharacterGuildAlert,
				);
				break;
			default:
				Logger.warn('Unknown event name', payload.event_name);
				break;
		}
	}

	private async createCharacterAlert(
		payload: CreateWarcraftCharacterAlert,
	): Promise<void> {
		Logger.log('Create new Character Alert', payload);
		await this.service.sendEvent(
			`New Character: ${payload.character.name}`,
			'warcraft',
			['Azkaban', 'Api', 'Warcraft', 'Character'],
		);
	}

	private async updateCharacterGuild(
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
