import { Controller, Sse } from '@nestjs/common';
import { AzkabanNotificationTopics, SSERoutes } from '@azkaban/shared';
import { Observable, Subject } from 'rxjs';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller({
	path: SSERoutes.CONTROLLER,
	version: '1',
})
export class SseController {
	private readonly events$ = new Subject<MessageEvent>();

	private transformToMessageEvent(
		event: string,
		data: unknown,
	): MessageEvent {
		return new MessageEvent(event, {
			data: {
				data,
			},
		});
	}

	private onSendNextEvent(event: string, data: unknown): void {
		const messageEvent = this.transformToMessageEvent(event, data);
		this.events$.next(messageEvent);
	}

	@EventPattern(AzkabanNotificationTopics.LOGIN)
	onLogin(
		@Payload('event') event: string,
		@Payload('data') data: unknown,
	): void {
		this.onSendNextEvent(event, data);
	}

	@EventPattern(AzkabanNotificationTopics.REGISTER)
	onRegister(
		@Payload('event') event: string,
		@Payload('data') data: unknown,
	): void {
		this.onSendNextEvent(event, data);
	}

	@Sse()
	onEvents(): Observable<MessageEvent> {
		return this.events$.asObservable();
	}
}
