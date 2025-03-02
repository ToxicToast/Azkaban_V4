import { Controller, Sse } from '@nestjs/common';
import { AzkabanSSETopics, SSERoutes } from '@azkaban/shared';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller({
	path: SSERoutes.CONTROLLER,
	version: '1',
})
export class SseController {
	constructor(private readonly service: SseService) {}

	@Sse()
	onEvents(): Observable<MessageEvent> {
		return this.service.getObservable();
	}

	// AUTH
	@EventPattern(AzkabanSSETopics.LOGIN)
	onLogin(
		@Payload('id') id: string,
		@Payload('username') username: string,
	): void {
		this.service.onSendNextEvent(AzkabanSSETopics.LOGIN, { id, username });
	}

	// TWITCHBOT
	@EventPattern(AzkabanSSETopics.TWITCHBOT)
	onTwitchEvent(
		@Payload('event') event: string,
		@Payload('data') data: unknown,
	): void {
		this.service.onSendNextEvent(AzkabanSSETopics.TWITCHBOT, {
			event,
			data,
		});
	}
}
