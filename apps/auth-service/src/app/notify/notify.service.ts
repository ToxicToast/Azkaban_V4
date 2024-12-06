import { Injectable, Logger } from '@nestjs/common';
import { AuthEvents, KafkaService } from '@toxictoast/sleepyazkaban-kafka';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotifyService {
	constructor(private readonly kafkaClient: KafkaService) {}

	@OnEvent(AuthEvents.REGISTER_SUCCESSFUL)
	handleRegisterSuccessfulEvent(payload: {
		id: string;
		username: string;
	}): void {
		Logger.debug(payload);
	}

	@OnEvent(AuthEvents.REGISTER_FAILED)
	handleRegisterFailedEvent(payload: {
		username: string;
		email: string;
	}): void {
		Logger.debug(payload);
	}

	@OnEvent(AuthEvents.LOGIN_SUCCESSFUL)
	handleLoginSuccessfulEvent(payload: {
		id: string;
		username: string;
	}): void {
		Logger.debug(payload);
	}

	@OnEvent(AuthEvents.LOGIN_FAILED)
	handleLoginFailedEvent(payload: { username: string }): void {
		Logger.debug(payload);
	}
}
