import { Injectable, Logger } from '@nestjs/common';
import { AuthEvents, KafkaService } from '@toxictoast/sleepyazkaban-kafka';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotifyService {
	constructor(private readonly kafkaClient: KafkaService) {}

	@OnEvent(AuthEvents.REGISTER_SUCCESSFUL)
	handleUserCreatedEvent(payload: { id: string; username: string }): void {
		Logger.debug(payload);
	}

	@OnEvent(AuthEvents.LOGIN_SUCCESSFUL)
	handleUserLoggedInEvent(payload: { id: string; username: string }): void {
		Logger.debug(payload);
	}
}
