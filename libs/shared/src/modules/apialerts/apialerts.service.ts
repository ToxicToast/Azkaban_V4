import { Inject, Injectable } from '@nestjs/common';
import alerts from 'apialerts-js';
import { Optional } from '../../types';

@Injectable()
export class ApiAlertsService {
	private readonly instance: typeof alerts;

	constructor(
		@Inject('API_KEY')
		private readonly apiKey: string,
	) {
		this.instance = alerts.setApiKey(this.apiKey);
	}

	sendEvent(
		message: string,
		channel?: Optional<string>,
		tags?: Optional<Array<string>>,
		link?: Optional<string>,
	): void {
		try {
			this.instance.send({
				message,
				channel,
				tags,
				link,
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}
