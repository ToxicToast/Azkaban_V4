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

	@EventPattern(AzkabanSSETopics.LOGIN)
	onLogin(
		@Payload('id') id: string,
		@Payload('username') username: string,
	): void {
		this.service.onSendNextEvent(AzkabanSSETopics.LOGIN, { id, username });
	}
}
